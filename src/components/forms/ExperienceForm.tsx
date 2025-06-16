
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface ExperienceFormProps {
  data: any[];
  onChange: (data: any[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ExperienceForm = ({ data, onChange, onNext, onPrev }: ExperienceFormProps) => {
  const addExperience = () => {
    onChange([...data, {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    }]);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: string, value: string | boolean) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <p className="text-sm text-gray-600">
          Add your professional work experience
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No work experience yet. Click "Add Experience" to get started.</p>
          </div>
        )}

        {data.map((exp, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Experience {index + 1}</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeExperience(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company *</Label>
                <Input
                  placeholder="Google Inc."
                  value={exp.company || ''}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Position *</Label>
                <Input
                  placeholder="Software Engineer"
                  value={exp.position || ''}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate || ''}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate || ''}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  disabled={exp.current}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
                value={exp.description || ''}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}

        <Button
          onClick={addExperience}
          variant="outline"
          className="w-full flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button onClick={onNext} className="flex items-center gap-2">
            Next: Projects
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
