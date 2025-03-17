import React from 'react';
import { CourseDetails, CourseProgress } from '@/shared/types';
import { Progress } from '@/components/ui/progress';

interface CourseProgressCardProps {
  course: CourseDetails;
  courseProgress?: CourseProgress; // Add this to get progress information
}

const CourseProgressCard: React.FC<CourseProgressCardProps> = ({ course, courseProgress }) => {
  // Calculate progress percentage if courseProgress is provided
  const progressPercentage = courseProgress ? courseProgress.percentComplete : 0;
  
  // Calculate completed modules count
  const completedModulesCount = courseProgress ? courseProgress.completedModules.length : 0;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-2">{course.title}: Your Progress</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex items-center mb-2">
          <div className="relative w-16 h-16 mr-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-green-600 text-xl font-bold">{progressPercentage}%</span>
            </div>
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#4ade80"
                strokeWidth="2"
                strokeDasharray={`${progressPercentage} 100`}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>
          </div>
          <div>
            <p className="text-gray-700">Your Development</p>
            <p className="text-sm text-gray-600">
              {completedModulesCount} of {course.totalModules} modules completed
            </p>
            <p className="text-sm text-gray-600">12 hours spent</p>
          </div>
        </div>
        
        {progressPercentage < 50 && (
          <div className="bg-green-100 text-green-800 p-2 rounded text-sm">
            You are 15% ahead of the average student!
          </div>
        )}
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Modules</h3>
        {course.modules.map((module, index) => (
          <div key={module.id} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm">
                {index + 1}. {module.title}
              </p>
              <span className="text-xs text-gray-600">{module.duration} hours</span>
            </div>
            <div className="flex items-center">
              <Progress value={module.progress} className="flex-1 h-4" />
              <span className="ml-2 text-xs">{module.progress}%</span>
            </div>
          </div>
        ))}
      </div>
      
      {progressPercentage > 0 && progressPercentage < 100 && (
        <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm text-blue-700">
          AI suggests: Continue with "3.4 Process-KPIs" to complete your current module
        </div>
      )}
    </div>
  );
};

export default CourseProgressCard;