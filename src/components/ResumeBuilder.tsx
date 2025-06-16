
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { EducationForm } from './forms/EducationForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { SkillsForm } from './forms/SkillsForm';
import { ResumePreview } from './ResumePreview';

interface ResumeBuilderProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resumeData: any;
  setResumeData: (data: any) => void;
}

export const ResumeBuilder = ({ 
  currentStep, 
  setCurrentStep, 
  resumeData, 
  setResumeData 
}: ResumeBuilderProps) => {
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) => setResumeData({ ...resumeData, personalInfo: data })}
            onNext={() => setCurrentStep(1)}
          />
        );
      case 1:
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(data) => setResumeData({ ...resumeData, education: data })}
            onNext={() => setCurrentStep(2)}
            onPrev={() => setCurrentStep(0)}
          />
        );
      case 2:
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(data) => setResumeData({ ...resumeData, experience: data })}
            onNext={() => setCurrentStep(3)}
            onPrev={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(data) => setResumeData({ ...resumeData, projects: data })}
            onNext={() => setCurrentStep(4)}
            onPrev={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => setResumeData({ ...resumeData, skills: data })}
            onNext={() => setCurrentStep(5)}
            onPrev={() => setCurrentStep(3)}
          />
        );
      case 5:
        return (
          <ResumePreview
            resumeData={resumeData}
            onPrev={() => setCurrentStep(4)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {renderCurrentStep()}
    </div>
  );
};
