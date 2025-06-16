
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  data: any[];
  onChange: (data: any[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const EducationForm = ({ data, onChange, onNext, onPrev }: EducationFormProps) => {
  const addEducation = () => {
    onChange([...data, {
      school: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      gpa: ''
    }]);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Education Background</CardTitle>
        <p className="text-sm text-gray-600">
          Add your educational qualifications
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No education entries yet. Click "Add Education" to get started.</p>
          </div>
        )}

        {data.map((edu, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Education {index + 1}</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>School/University *</Label>
                <Input
                  placeholder="Harvard University"
                  value={edu.school || ''}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Degree *</Label>
                <Input
                  placeholder="Bachelor's Degree"
                  value={edu.degree || ''}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input
                  placeholder="Computer Science"
                  value={edu.field || ''}
                  onChange={(e) => updateEducation(index, 'field', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Start Year</Label>
                <Input
                  placeholder="2018"
                  value={edu.startYear || ''}
                  onChange={(e) => updateEducation(index, 'startYear', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Year</Label>
                <Input
                  placeholder="2022"
                  value={edu.endYear || ''}
                  onChange={(e) => updateEducation(index, 'endYear', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={addEducation}
          variant="outline"
          className="w-full flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button onClick={onNext} className="flex items-center gap-2">
            Next: Experience
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
