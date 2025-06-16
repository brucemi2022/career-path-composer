
import { Button } from '@/components/ui/button';
import { User, Download, Eye } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          <p className="text-sm text-gray-600">Create your professional resume in minutes</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-2" />
            Account
          </Button>
        </div>
      </div>
    </header>
  );
};
