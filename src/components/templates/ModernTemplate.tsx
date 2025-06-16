
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface ModernTemplateProps {
  data: any;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-sans">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo?.address && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Work Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                {exp.description && (
                  <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.school}</p>
                    {edu.field && <p className="text-gray-600 text-sm">{edu.field}</p>}
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  {project.startDate && (
                    <span className="text-sm text-gray-600">
                      {project.startDate} - {project.endDate || 'Present'}
                    </span>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-blue-600 text-sm mb-2">{project.technologies}</p>
                )}
                {project.description && (
                  <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string, index: number) => (
              <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
