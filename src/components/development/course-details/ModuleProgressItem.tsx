import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Module } from '@/shared/types';
import { getModuleTitle } from '@/components/learn/moduleUtils';

interface ModuleProgressItemProps {
  module: Module;
  courseId?: string;
}

const ModuleProgressItem: React.FC<ModuleProgressItemProps> = ({ module, courseId }) => {
  // Determine the appropriate color based on progress
  let borderColor = "border-gray-200"; // Default for 0%
  let progressBgColor = "";
  let progressBarColor = "bg-blue-500"; // Default progress bar color
  let textColor = "text-gray-600";
  let statusText = "";
  
  if (module.progress === 100) {
    // Completed state
    borderColor = "border-green-500";
    progressBgColor = "bg-green-100";
    progressBarColor = "bg-green-500";
    textColor = "text-green-700";
    statusText = "Completed";
  } else if (module.progress >= 90) {
    // Almost complete - Master level
    borderColor = "border-green-500";
    progressBgColor = "bg-green-100";
    progressBarColor = "bg-green-500";
    textColor = "text-green-700";
    statusText = "Master level";
  } else if (module.progress >= 60) {
    // Developing level
    borderColor = "border-orange-500";
    progressBgColor = "bg-orange-100";
    progressBarColor = "bg-orange-500";
    textColor = "text-orange-700";
    statusText = "Developing";
  } else if (module.progress > 0) {
    // Needs focus level
    borderColor = "border-red-500";
    progressBgColor = "bg-red-100";
    progressBarColor = "bg-red-500";
    textColor = "text-red-700";
    statusText = "Needs focus";
  }
  
  // Try to get a better module title if courseId is provided
  let moduleTitle = module.title;
  if (courseId && module.id) {
    const moduleIndex = parseInt(module.id) - 1;
    if (!isNaN(moduleIndex)) {
      const betterTitle = getModuleTitle(courseId, moduleIndex);
      if (betterTitle && !betterTitle.includes("Unknown")) {
        moduleTitle = betterTitle;
      }
    }
  }
  
  return (
    <div
      className={`border-l-4 ${borderColor} pl-4 py-3 mb-3 bg-white rounded-r shadow-sm hover:shadow transition-all duration-200`}
      data-module-id={module.id}
      data-progress={module.progress}
    >
      <div className="flex justify-between mb-1">
        <h4 className="font-medium">{moduleTitle}</h4>
        <span className={`text-sm ${textColor}`}>{module.duration} hours</span>
      </div>
      <div className="flex items-center">
        <Progress
          value={module.progress}
          className={`h-3 flex-1 mr-2 ${progressBgColor} ${progressBarColor}`}
        />
        <span className={`text-sm font-medium ${textColor}`}>{module.progress}%</span>
      </div>
      
      {module.progress > 0 && module.progress < 100 && (
        <div className="mt-1 text-xs text-blue-600">
          {statusText} - continue learning
        </div>
      )}
      
      {module.progress === 100 && (
        <div className="mt-1 text-xs text-green-600">
          {statusText}
        </div>
      )}
    </div>
  );
};

export default ModuleProgressItem;