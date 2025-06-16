import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface APIKey {
  provider: string;
  key: string;
  masked: boolean;
}

export default function Settings() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [newProvider, setNewProvider] = useState('');
  const [newKey, setNewKey] = useState('');
  const [showKeys, setShowKeys] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = () => {
    const saved = localStorage.getItem('ai_api_keys');
    if (saved) {
      setApiKeys(JSON.parse(saved));
    }
  };

  const saveApiKeys = (keys: APIKey[]) => {
    localStorage.setItem('ai_api_keys', JSON.stringify(keys));
    setApiKeys(keys);
  };

  const addApiKey = () => {
    if (!newProvider || !newKey) {
      toast({
        title: "Error",
        description: "Please select a provider and enter an API key",
        variant: "destructive"
      });
      return;
    }

    const existing = apiKeys.find(k => k.provider === newProvider);
    if (existing) {
      toast({
        title: "Error",
        description: "API key for this provider already exists",
        variant: "destructive"
      });
      return;
    }

    const newApiKey: APIKey = {
      provider: newProvider,
      key: newKey,
      masked: true
    };

    saveApiKeys([...apiKeys, newApiKey]);
    setNewProvider('');
    setNewKey('');
    
    toast({
      title: "Success",
      description: "API key added successfully"
    });
  };

  const removeApiKey = (provider: string) => {
    const filtered = apiKeys.filter(k => k.provider !== provider);
    saveApiKeys(filtered);
    toast({
      title: "Success",
      description: "API key removed successfully"
    });
  };

  const toggleKeyVisibility = (provider: string) => {
    setShowKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return '***...***';
    return key.substring(0, 4) + '***...' + key.substring(key.length - 4);
  };

  const providers = [
    { id: 'gemini', name: 'Gemini', url: 'https://generativelanguage.googleapis.com' },
    { id: 'mistral', name: 'Mistral', url: 'https://api.mistral.ai' },
    { id: 'groq', name: 'Groq', url: 'https://api.groq.com/openai' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your AI API keys for resume assistance</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI API Keys</CardTitle>
            <p className="text-sm text-gray-600">
              Add your API keys to enable AI-powered resume features
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add new API key */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-4">Add New API Key</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>AI Provider</Label>
                  <Select value={newProvider} onValueChange={setNewProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>API Key</Label>
                  <Input
                    type="password"
                    placeholder="Enter your API key"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addApiKey} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Add Key
                  </Button>
                </div>
              </div>
            </div>

            {/* Existing API keys */}
            <div className="space-y-4">
              <h3 className="font-medium">Your API Keys</h3>
              {apiKeys.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No API keys configured yet. Add one above to get started.
                </div>
              ) : (
                apiKeys.map(apiKey => (
                  <div key={apiKey.provider} className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">
                        {providers.find(p => p.id === apiKey.provider)?.name}
                      </Badge>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {showKeys[apiKey.provider] ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.provider)}
                      >
                        {showKeys[apiKey.provider] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeApiKey(apiKey.provider)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Provider information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">How to get API keys:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Gemini:</strong> Visit Google AI Studio and create an API key</li>
                <li>• <strong>Mistral:</strong> Sign up at Mistral AI and generate an API key</li>
                <li>• <strong>Groq:</strong> Create an account at Groq and get your API key</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
