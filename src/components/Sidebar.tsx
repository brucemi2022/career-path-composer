
import { cn } from '@/lib/utils';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  FolderOpen, 
  Wrench,
  Eye,
  CheckCircle
} from 'lucide-react';

interface SidebarProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const steps = [
  { id: 0, title: 'Personal Info', icon: User, description: 'Basic information' },
  { id: 1, title: 'Education', icon: GraduationCap, description: 'Academic background' },
  { id: 2, title: 'Experience', icon: Briefcase, description: 'Work history' },
  { id: 3, title: 'Projects', icon: FolderOpen, description: 'Project portfolio' },
  { id: 4, title: 'Skills', icon: Wrench, description: 'Technical skills' },
  { id: 5, title: 'Preview', icon: Eye, description: 'Final review' },
];

export const Sidebar = ({ currentStep, setCurrentStep }: SidebarProps) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Build Your Resume</h2>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      <nav className="space-y-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                isActive 
                  ? "bg-blue-50 border border-blue-200 text-blue-700" 
                  : "hover:bg-gray-50 text-gray-700"
              )}
            >
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : isCompleted 
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-600"
              )}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-medium text-sm",
                  isActive ? "text-blue-900" : "text-gray-900"
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {step.description}
                </p>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
