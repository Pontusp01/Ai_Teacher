import React from 'react';
import { Course } from '@/shared/types';
import StudyPlanPanel from './StudyPlanPanel';
import CopcCourseSidebar from './CopcCourseSidebar';
import KpiCourseSidebar from './KpiCourseSidebar';
import DefaultCourseSidebar from './DefaultCourseSidebar';
import CompetenceLevelLegend from './CompetenceLevelLegend';

interface LearnSidebarProps {
  course: Course | null;
  courseId: string;
  currentModuleIndex: number | null;
  onModuleSelect: (index: number) => void;
  moduleCompetence: number[];
  correctAttempts?: number[];
}

const LearnSidebar: React.FC<LearnSidebarProps> = ({
  course,
  courseId,
  currentModuleIndex,
  onModuleSelect,
  moduleCompetence,
  correctAttempts = []
}) => {
  // No need for courseStarted state in this component
  
  // Render sidebar based on course
  const renderSidebar = () => {
    if (!course) return <div className="p-4">Loading...</div>;

    if (courseId === 'course1') {
      // COPC Basic Course sidebar
      return (
        <CopcCourseSidebar
          course={course}
          currentModuleIndex={currentModuleIndex}
          onModuleSelect={onModuleSelect}
          moduleCompetence={moduleCompetence}
          correctAttempts={correctAttempts}
        />
      );
    } else if (courseId === 'course4') {
      // KPI Implementation Guide sidebar
      return (
        <KpiCourseSidebar
          course={course}
          currentModuleIndex={currentModuleIndex}
          onModuleSelect={onModuleSelect}
          moduleCompetence={moduleCompetence}
          correctAttempts={correctAttempts}
        />
      );
    } else {
      // Default sidebar for other courses
      return (
        <DefaultCourseSidebar
          course={course}
          currentModuleIndex={currentModuleIndex}
          onModuleSelect={onModuleSelect}
          moduleCompetence={moduleCompetence}
          correctAttempts={correctAttempts}
        />
      );
    }
  };

  return (
    <div className="p-4 border-r h-full overflow-y-auto">
      <StudyPlanPanel courseId={courseId} />
      
      {renderSidebar()}
      
      {currentModuleIndex !== null && (
        <CompetenceLevelLegend 
          moduleCompetence={moduleCompetence} 
          correctAttempts={correctAttempts} 
        />
      )}
    </div>
  );
};

export default LearnSidebar;