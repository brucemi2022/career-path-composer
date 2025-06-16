
import { Badge } from '@/components/ui/badge';

interface ClassicTemplateProps {
  data: any;
}

export const ClassicTemplate = ({ data }: ClassicTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-serif">
      {/* Header */}
      <div className="text-center border-b border-gray-400 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-600 space-x-3">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo?.address && <span>• {data.personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
            Objective
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="font-semibold text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm leading-relaxed mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="font-semibold text-gray-700">{edu.school}</p>
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
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">{project.name}</h3>
                  {project.startDate && (
                    <span className="text-sm text-gray-600">
                      {project.startDate} - {project.endDate || 'Present'}
                    </span>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-gray-700 font-semibold text-sm mb-1">{project.technologies}</p>
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
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
            Skills
          </h2>
          <p className="text-gray-700">
            {data.skills.join(' • ')}
          </p>
        </div>
      )}
    </div>
  );
};
