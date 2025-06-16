
import { useState } from 'react';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { AIAssistant } from '@/components/AIAssistant';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    education: [],
    experience: [],
    projects: [],
    skills: []
  });

  const handleDataUpdate = (field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ResumeBuilder
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            </div>
            <div className="lg:col-span-1">
              <AIAssistant
                resumeData={resumeData}
                onUpdateData={handleDataUpdate}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
