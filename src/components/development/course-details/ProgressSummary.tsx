
import React from 'react';
import ProgressCircle from './ProgressCircle';
import { CourseProgress } from '@/shared/types';

interface ProgressSummaryProps {
  percentComplete: number;
  completedModules: number;
  totalModules: number;
  timeSpent: number;
  lastActivity: string;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  percentComplete,
  completedModules,
  totalModules,
  timeSpent,
  lastActivity
}) => {
  // Format the last activity date
  const formatLastActivity = () => {
    try {
      const date = new Date(lastActivity);
      return date.toLocaleString();
    } catch (e) {
      return lastActivity;
    }
  };

  return (
    <div className="bg-white rounded-lg mb-6">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <ProgressCircle percentComplete={percentComplete} />
        
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-1">Your Development</h3>
          <p className="text-gray-700">{completedModules} of {totalModules} modules completed</p>
          <p className="text-gray-700">{timeSpent} hours spent</p>
          <p className="text-gray-700">Latest activity: {formatLastActivity()}</p>
          
          <div className="mt-3 bg-green-100 p-3 rounded-md inline-block">
            <p className="text-green-800">You're 15% ahead of the average student!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;
