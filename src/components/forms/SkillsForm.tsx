
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Plus, X } from 'lucide-react';

interface SkillsFormProps {
  data: string[];
  onChange: (data: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const SkillsForm = ({ data, onChange, onNext, onPrev }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 
    'HTML/CSS', 'SQL', 'Git', 'AWS', 'Docker', 'MongoDB', 
    'Express.js', 'Vue.js',  'Angular', 'Java', 'C++', 
    'Machine Learning', 'Data Analysis', 'Figma', 'Photoshop'
  ];

  const availableSuggestions = suggestedSkills.filter(skill => !data.includes(skill));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Skills & Technologies</CardTitle>
        <p className="text-sm text-gray-600">
          Add your technical skills and competencies
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="skill">Add a skill</Label>
              <Input
                id="skill"
                placeholder="e.g., JavaScript, Python, React..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addSkill} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {availableSuggestions.length > 0 && (
            <div>
              <Label className="text-sm text-gray-600">Suggested skills:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableSuggestions.slice(0, 10).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => {
                      onChange([...data, skill]);
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <Label>Your Skills ({data.length})</Label>
          <div className="mt-2 min-h-[100px] border rounded-lg p-4">
            {data.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No skills added yet. Start by adding your key skills above.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.map((skill) => (
                  <Badge
                    key={skill}
                    variant="default"
                    className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button onClick={onNext} className="flex items-center gap-2">
            Preview Resume
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
