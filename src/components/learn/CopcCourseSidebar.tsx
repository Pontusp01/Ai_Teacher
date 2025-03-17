
import React from 'react';
import { Course } from '@/shared/types';
import SidebarModuleItem from './SidebarModuleItem';

interface CopcCourseSidebarProps {
  course: Course | null;
  currentModuleIndex: number | null;
  onModuleSelect: (index: number) => void;
  moduleCompetence: number[];
  correctAttempts?: number[];
}

const CopcCourseSidebar: React.FC<CopcCourseSidebarProps> = ({ 
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
          title="1. COPC Introduction"
          isCurrentModule={currentModuleIndex === 0}
          competenceValue={moduleCompetence[0] || 0}
          correctAttempts={correctAttempts[0] || 0}
          onClick={() => onModuleSelect(0)}
        />
        
        <SidebarModuleItem
          index={1}
          title="2. COPC Leadership"
          isCurrentModule={currentModuleIndex === 1}
          competenceValue={moduleCompetence[1] || 0}
          correctAttempts={correctAttempts[1] || 0}
          onClick={() => onModuleSelect(1)}
        />
        
        <SidebarModuleItem
          index={2}
          title="3. COPC Processes"
          isCurrentModule={currentModuleIndex === 2}
          competenceValue={moduleCompetence[2] || 0}
          correctAttempts={correctAttempts[2] || 0}
          onClick={() => onModuleSelect(2)}
        />
        
        <div className="ml-4 space-y-2 mt-2">
          <SidebarModuleItem
            index={3}
            title="3.1 Process Theory"
            isCurrentModule={currentModuleIndex === 3}
            competenceValue={moduleCompetence[3] || 0}
            correctAttempts={correctAttempts[3] || 0}
            onClick={() => onModuleSelect(3)}
            isSubItem={true}
          />
          
          <SidebarModuleItem
            index={4}
            title="3.2 Process Management"
            isCurrentModule={currentModuleIndex === 4}
            competenceValue={moduleCompetence[4] || 0}
            correctAttempts={correctAttempts[4] || 0}
            onClick={() => onModuleSelect(4)}
            isSubItem={true}
          />
          
          <SidebarModuleItem
            index={5}
            title="3.3 Process Control"
            isCurrentModule={currentModuleIndex === 5}
            competenceValue={moduleCompetence[5] || 0}
            correctAttempts={correctAttempts[5] || 0}
            onClick={() => onModuleSelect(5)}
            isSubItem={true}
          />
          
          <SidebarModuleItem
            index={6}
            title="3.4 Process-KPIs"
            isCurrentModule={currentModuleIndex === 6}
            competenceValue={moduleCompetence[6] || 0}
            correctAttempts={correctAttempts[6] || 0}
            onClick={() => onModuleSelect(6)}
            isSubItem={true}
          />
        </div>
      </div>
    </>
  );
};

export default CopcCourseSidebar;
