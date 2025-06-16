
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface PersonalInfoFormProps {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}

export const PersonalInfoForm = ({ data, onChange, onNext }: PersonalInfoFormProps) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Personal Information
        </CardTitle>
        <p className="text-sm text-gray-600">
          Let's start with your basic information
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={data.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="City, State, Country"
              value={data.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            placeholder="Write a brief summary about your professional background and career objectives..."
            rows={4}
            value={data.summary || ''}
            onChange={(e) => handleChange('summary', e.target.value)}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onNext} className="flex items-center gap-2">
            Next: Education
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
