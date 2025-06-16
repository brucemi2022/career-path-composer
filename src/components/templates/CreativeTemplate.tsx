
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin } from 'lucide-react';

interface CreativeTemplateProps {
  data: any;
}

export const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-t-lg">
        <h1 className="text-4xl font-bold mb-3">
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
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

      <div className="p-8">
        {/* Summary */}
        {data.personalInfo?.summary && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded"></div>
              <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded"></div>
              <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-purple-600 rounded-full"></div>
                  <div className="absolute left-1.5 top-5 w-0.5 h-full bg-purple-200"></div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                        <p className="text-purple-600 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded"></div>
              <h2 className="text-2xl font-bold text-gray-900">Education</h2>
            </div>
            <div className="grid gap-4">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{edu.degree}</h3>
                      <p className="text-purple-600 font-semibold">{edu.school}</p>
                      {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    </div>
                    <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
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
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded"></div>
              <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            </div>
            <div className="grid gap-4">
              {data.projects.map((project: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{project.name}</h3>
                    {project.startDate && (
                      <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
                        {project.startDate} - {project.endDate || 'Present'}
                      </span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-purple-600 font-semibold mb-2">{project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded"></div>
              <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill: string, index: number) => (
                <Badge 
                  key={index} 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-80 px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
