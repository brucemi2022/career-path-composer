
import { useState } from 'react';
import { ResumeBuilder } from '@/components/ResumeBuilder';
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <ResumeBuilder
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
