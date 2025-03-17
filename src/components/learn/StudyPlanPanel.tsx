
import React from 'react';

interface StudyPlanPanelProps {
  courseId: string;
}

const StudyPlanPanel: React.FC<StudyPlanPanelProps> = ({ courseId }) => {
  return (
    <div className="p-3 bg-blue-50 rounded-md mb-4">
      <h3 className="font-medium text-blue-800">Personal Study Plan</h3>
      <p className="text-sm text-blue-700">
        Your current focus: {courseId === 'course1' ? 'Process-KPIs' : 'KPI Implementation Process'}
      </p>
      <p className="text-sm text-blue-700">Updated time: {courseId === 'course1' ? '45 min' : '30 min'}</p>
    </div>
  );
};

export default StudyPlanPanel;
