
import React from 'react';

interface ProgressCircleProps {
  percentComplete: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percentComplete }) => {
  return (
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-green-600 text-3xl font-bold">{percentComplete}%</span>
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
          strokeDasharray={`${percentComplete} 100`}
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
        />
      </svg>
    </div>
  );
};

export default ProgressCircle;
