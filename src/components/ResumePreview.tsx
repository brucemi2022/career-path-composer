
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Eye } from 'lucide-react';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

interface ResumePreviewProps {
  resumeData: any;
  onPrev: () => void;
}

export const ResumePreview = ({ resumeData, onPrev }: ResumePreviewProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const templates = [
    { id: 'modern', name: 'Modern', component: ModernTemplate },
    { id: 'classic', name: 'Classic', component: ClassicTemplate },
    { id: 'creative', name: 'Creative', component: CreativeTemplate },
  ];

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || ModernTemplate;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume Preview</CardTitle>
          <p className="text-sm text-gray-600">
            Choose a template and preview your resume
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Choose Template:</h4>
              <div className="flex gap-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate === template.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export as PDF
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Full Screen Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <SelectedTemplateComponent data={resumeData} />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Resume
        </Button>
      </div>
    </div>
  );
};
