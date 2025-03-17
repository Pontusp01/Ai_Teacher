import React from 'react';
import CompetenceIndicator, { MODULE_COMPETENCE, getCompetenceColor } from './CompetenceIndicator';

interface SidebarModuleItemProps {
  index: number;
  title: string;
  isCurrentModule: boolean;
  onClick: () => void;
  isSubItem?: boolean;
}

const SidebarModuleItem: React.FC<SidebarModuleItemProps> = ({
  index,
  title,
  isCurrentModule,
  onClick,
  isSubItem = false,
}) => {
  // Hämta kompetens direkt från MODULE_COMPETENCE
  const competenceValue = MODULE_COMPETENCE.getValue(index);
  const competenceColorClass = getCompetenceColor(index);
  
  return (
    <div className="flex items-center cursor-pointer mb-1">
      {/* Kompetensindikator (ikon) */}
      <div className="mr-2">
        <CompetenceIndicator moduleIndex={index} />
      </div>
      
      {/* Modulknapp med kompetensindikator */}
      <button
        onClick={onClick}
        className={`rounded border ${isCurrentModule ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-200'} p-2 w-full ${isSubItem ? 'text-sm' : ''} hover:bg-blue-100 flex items-center justify-between`}
      >
        <span>{title}</span>
        
        {/* Visa kompetens om större än 0 */}
        {competenceValue > 0 && (
          <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${competenceColorClass} ml-1`}>
            {competenceValue}%
          </span>
        )}
      </button>
    </div>
  );
};

export default SidebarModuleItem;