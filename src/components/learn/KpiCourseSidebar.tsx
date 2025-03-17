
import React from 'react';
import { Course } from '@/shared/types';
import SidebarModuleItem from './SidebarModuleItem';

interface KpiCourseSidebarProps {
  course: Course | null;
  currentModuleIndex: number;
  onModuleSelect: (index: number) => void;
  moduleCompetence: number[];
  correctAttempts?: number[];
}

const KpiCourseSidebar: React.FC<KpiCourseSidebarProps> = ({ 
  course, 
  currentModuleIndex, 
  onModuleSelect, 
  moduleCompetence,
  correctAttempts = [] 
}) => {
  if (!course) return <div>Loading...</div>;

  return (
    <>
      <h2 className="font-bold text-gray-800 mb-3">{course.title}</h2>
      
      <div className="space-y-2">
        <SidebarModuleItem
          index={0}
          title="1. KPI Fundamentals"
          isCurrentModule={currentModuleIndex === 0}
          competenceValue={moduleCompetence[0] || 0}
          correctAttempts={correctAttempts[0] || 0}
          onClick={() => onModuleSelect(0)}
        />
        
        <div className="ml-4 space-y-2 mt-2">
          <SidebarModuleItem
            index={1}
            title="1.1 Introduction to KPIs"
            isCurrentModule={currentModuleIndex === 1}
            competenceValue={moduleCompetence[1] || 0}
            correctAttempts={correctAttempts[1] || 0}
            onClick={() => onModuleSelect(1)}
            isSubItem={true}
          />
          
          <SidebarModuleItem
            index={2}
            title="1.2 KPI Implementation Process"
            isCurrentModule={currentModuleIndex === 2}
            competenceValue={moduleCompetence[2] || 0}
            correctAttempts={correctAttempts[2] || 0}
            onClick={() => onModuleSelect(2)}
            isSubItem={true}
          />
        </div>
        
        <SidebarModuleItem
          index={3}
          title="2. Selecting Effective KPIs"
          isCurrentModule={currentModuleIndex === 3}
          competenceValue={moduleCompetence[3] || 0}
          correctAttempts={correctAttempts[3] || 0}
          onClick={() => onModuleSelect(3)}
        />
        
        <SidebarModuleItem
          index={4}
          title="3. Monitoring & Reporting"
          isCurrentModule={currentModuleIndex === 4}
          competenceValue={moduleCompetence[4] || 0}
          correctAttempts={correctAttempts[4] || 0}
          onClick={() => onModuleSelect(4)}
        />
      </div>
    </>
  );
};

export default KpiCourseSidebar;
