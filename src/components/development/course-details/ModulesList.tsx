
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseModule } from '@/shared/types';
import ModuleProgressItem from './ModuleProgressItem';
import CompetenceLegend from './CompetenceLegend';

interface ModulesListProps {
  modules: CourseModule[];
  courseId: string;
}

const ModulesList: React.FC<ModulesListProps> = ({ modules, courseId }) => {
  // Get competence levels for display in the legend
  const countMasterModules = modules.filter(m => m.progress >= 90).length;
  const countDevelopingModules = modules.filter(m => m.progress >= 60 && m.progress < 90).length;
  const countNeedsFocusModules = modules.filter(m => m.progress > 0 && m.progress < 60).length;
  const countUnattemptedModules = modules.filter(m => m.progress === 0).length;
  
  const hasStartedCourse = modules.some(m => m.progress > 0);
  
  return (
    <div className="bg-white rounded-lg">
      <h3 className="font-medium mb-4">Modules</h3>
      
      <div className="space-y-4">
        {modules.map((module) => (
          <ModuleProgressItem 
            key={module.id} 
            module={module} 
            courseId={courseId} 
          />
        ))}
      </div>
      
      <CompetenceLegend
        countMasterModules={countMasterModules}
        countDevelopingModules={countDevelopingModules}
        countNeedsFocusModules={countNeedsFocusModules}
        countUnattemptedModules={countUnattemptedModules}
      />
      
      {modules.length > 0 && (
        <div className="mt-4 bg-blue-50 p-4 rounded text-sm text-blue-700">
          AI suggests: Continue with your course to improve your progress
        </div>
      )}
      
      <div className="mt-4 flex justify-center">
        <Link 
          to={`/learn?courseId=${courseId}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Continue Learning
        </Link>
      </div>
    </div>
  );
};

export default ModulesList;
