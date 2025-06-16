
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  data: any[];
  onChange: (data: any[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ProjectsForm = ({ data, onChange, onNext, onPrev }: ProjectsFormProps) => {
  const addProject = () => {
    onChange([...data, {
      name: '',
      description: '',
      technologies: '',
      url: '',
      startDate: '',
      endDate: ''
    }]);
  };

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <p className="text-sm text-gray-600">
          Showcase your important projects and achievements
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No projects yet. Click "Add Project" to get started.</p>
          </div>
        )}

        {data.map((project, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Project {index + 1}</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeProject(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Name *</Label>
                <Input
                  placeholder="E-commerce Platform"
                  value={project.name || ''}
                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Project URL</Label>
                <Input
                  placeholder="https://github.com/username/project"
                  value={project.url || ''}
                  onChange={(e) => updateProject(index, 'url', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <Input
                placeholder="React, Node.js, MongoDB, AWS"
                value={project.technologies || ''}
                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={project.startDate || ''}
                  onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={project.endDate || ''}
                  onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Project Description</Label>
              <Textarea
                placeholder="Describe the project, your role, and key achievements..."
                rows={3}
                value={project.description || ''}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}

        <Button
          onClick={addProject}
          variant="outline"
          className="w-full flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button onClick={onNext} className="flex items-center gap-2">
            Next: Skills
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
