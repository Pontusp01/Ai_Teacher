import React from 'react';
import { Course } from '@/shared/types';
import SidebarModuleItem from './SidebarModuleItem';
import { MODULE_COMPETENCE } from './CompetenceIndicator';

interface DefaultCourseSidebarProps {
  course: Course | null;
  currentModuleIndex: number | null;
  onModuleSelect: (index: number) => void;
  moduleCompetence: number[];
  correctAttempts?: number[];
}

const DefaultCourseSidebar: React.FC<DefaultCourseSidebarProps> = ({
  course,
  currentModuleIndex,
  onModuleSelect,
  moduleCompetence
}) => {
  // Initiera moduler i MODULE_COMPETENCE om det behövs
  React.useEffect(() => {
    if (moduleCompetence && moduleCompetence.length > 0) {
      // För varje modul, se till att värdet finns i MODULE_COMPETENCE
      moduleCompetence.forEach((value, index) => {
        if (MODULE_COMPETENCE.getValue(index) !== value) {
          MODULE_COMPETENCE.setValue(index, value);
        }
      });
    }
  }, [moduleCompetence]);
  
  if (!course) return <div>Loading...</div>;

  return (
    <>
      <h2 className="font-bold text-gray-800 mb-3">{course.title}</h2>
      
      <div className="space-y-2">
        <SidebarModuleItem
          index={0}
          title="1. Module One"
          isCurrentModule={currentModuleIndex === 0}
          onClick={() => onModuleSelect(0)}
        />
        
        <SidebarModuleItem
          index={1}
          title="2. Module Two"
          isCurrentModule={currentModuleIndex === 1}
          onClick={() => onModuleSelect(1)}
        />
        
        <SidebarModuleItem
          index={2}
          title="3. Module Three"
          isCurrentModule={currentModuleIndex === 2}
          onClick={() => onModuleSelect(2)}
        />
      </div>
    </>
  );
};

export default DefaultCourseSidebar;