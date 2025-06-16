
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Loader2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIAssistantProps {
  resumeData: any;
  onUpdateData: (field: string, value: any) => void;
}

export const AIAssistant = ({ resumeData, onUpdateData }: AIAssistantProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const getApiKeys = () => {
    const saved = localStorage.getItem('ai_api_keys');
    return saved ? JSON.parse(saved) : [];
  };

  const callAI = async (prompt: string, provider: string) => {
    const apiKeys = getApiKeys();
    const apiKey = apiKeys.find((k: any) => k.provider === provider);
    
    if (!apiKey) {
      throw new Error('API key not found for selected provider');
    }

    let response;
    
    switch (provider) {
      case 'gemini':
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey.key}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          })
        });
        break;
        
      case 'mistral':
        response = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey.key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'mistral-small-latest',
            messages: [
              { role: 'user', content: prompt }
            ]
          })
        });
        break;
        
      case 'groq':
        response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey.key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [
              { role: 'user', content: prompt }
            ]
          })
        });
        break;
        
      default:
        throw new Error('Unsupported provider');
    }

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    switch (provider) {
      case 'gemini':
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
      case 'mistral':
      case 'groq':
        return data.choices?.[0]?.message?.content || 'No response generated';
      default:
        return 'No response generated';
    }
  };

  const generateProfessionalSummary = async () => {
    if (!selectedProvider) {
      toast({
        title: "Error",
        description: "Please select an AI provider",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = `Generate a professional summary for a resume based on the following information:
      
      Name: ${resumeData.personalInfo?.fullName || 'Not provided'}
      Experience: ${JSON.stringify(resumeData.experience || [])}
      Education: ${JSON.stringify(resumeData.education || [])}
      Skills: ${resumeData.skills?.join(', ') || 'Not provided'}
      Projects: ${JSON.stringify(resumeData.projects || [])}
      
      Create a compelling 2-3 sentence professional summary that highlights key strengths and career objectives. Make it specific to their background and avoid generic language.`;

      const result = await callAI(prompt, selectedProvider);
      setGeneratedText(result);
      
      toast({
        title: "Success",
        description: "Professional summary generated successfully"
      });
    } catch (error) {
      console.error('AI generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const optimizeSkills = async () => {
    if (!selectedProvider) {
      toast({
        title: "Error",
        description: "Please select an AI provider",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = `Analyze and optimize the following resume skills for better keyword matching and industry relevance:
      
      Current skills: ${resumeData.skills?.join(', ') || 'None provided'}
      Experience: ${JSON.stringify(resumeData.experience || [])}
      Education: ${JSON.stringify(resumeData.education || [])}
      
      Provide an optimized list of skills that:
      1. Includes relevant industry keywords
      2. Removes redundant or outdated skills
      3. Adds missing important skills based on their experience
      4. Groups related skills logically
      
      Return only the optimized skills list, separated by commas, without explanations.`;

      const result = await callAI(prompt, selectedProvider);
      setGeneratedText(result);
      
      toast({
        title: "Success",
        description: "Skills optimization completed"
      });
    } catch (error) {
      console.error('AI generation error:', error);
      toast({
        title: "Error",
        description: "Failed to optimize skills. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const applyToResume = () => {
    if (!generatedText) return;

    // Determine what to apply based on the generated content
    if (generatedText.includes(',') && generatedText.split(',').length > 3) {
      // Likely skills optimization
      const skills = generatedText.split(',').map(s => s.trim()).filter(s => s);
      onUpdateData('skills', skills);
      toast({
        title: "Applied",
        description: "Optimized skills applied to resume"
      });
    } else {
      // Likely professional summary
      onUpdateData('personalInfo', {
        ...resumeData.personalInfo,
        summary: generatedText
      });
      toast({
        title: "Applied",
        description: "Professional summary applied to resume"
      });
    }
    
    setGeneratedText('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied",
      description: "Text copied to clipboard"
    });
  };

  const availableProviders = getApiKeys();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5" />
          AI Resume Assistant
        </CardTitle>
        <p className="text-sm text-gray-600">
          Use AI to generate professional summaries and optimize your skills
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {availableProviders.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">No AI providers configured</p>
            <Button variant="outline" onClick={() => window.location.href = '/settings'}>
              Configure API Keys
            </Button>
          </div>
        ) : (
          <>
            <div>
              <label className="text-sm font-medium">Select AI Provider</label>
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an AI provider" />
                </SelectTrigger>
                <SelectContent>
                  {availableProviders.map((provider: any) => (
                    <SelectItem key={provider.provider} value={provider.provider}>
                      {provider.provider.charAt(0).toUpperCase() + provider.provider.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={generateProfessionalSummary}
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4 mr-2" />
                )}
                Generate Summary
              </Button>
              <Button 
                onClick={optimizeSkills}
                disabled={loading}
                variant="outline"
                className="flex-1"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4 mr-2" />
                )}
                Optimize Skills
              </Button>
            </div>

            {generatedText && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">Generated Content</Badge>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={applyToResume}
                    >
                      Apply to Resume
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={generatedText}
                  onChange={(e) => setGeneratedText(e.target.value)}
                  className="bg-white"
                  rows={6}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
