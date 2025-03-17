import React, { useMemo } from 'react';
import { Trophy, Award, AlertTriangle, Circle } from 'lucide-react';
import { MODULE_COMPETENCE } from './CompetenceIndicator';

interface CompetenceLevelLegendProps {
  // Inga props behövs eftersom vi använder MODULE_COMPETENCE
} 

const CompetenceLevelLegend: React.FC<CompetenceLevelLegendProps> = () => {
  // Beräkna kompetensdata från MODULE_COMPETENCE
  const competenceData = useMemo(() => {
    const values = Object.values(MODULE_COMPETENCE.values);
    
    // Kategorisera moduler efter kompetens
    const masterModules = values.filter(value => value >= 90);
    const developingModules = values.filter(value => value >= 60 && value < 90);
    const needsFocusModules = values.filter(value => value > 0 && value < 60);
    const unattemptedModules = Object.keys(MODULE_COMPETENCE.values).length - 
      (masterModules.length + developingModules.length + needsFocusModules.length);
    
    // Antal moduler per kategori
    const countMasterModules = masterModules.length;
    const countDevelopingModules = developingModules.length;
    const countNeedsFocusModules = needsFocusModules.length;
    const countUnattemptedModules = unattemptedModules;
    
    // Beräkna genomsnittlig kompetens för aktiva moduler
    const attemptedModules = values.filter(value => value > 0);
    const overallCompetence = attemptedModules.length > 0
      ? Math.round(attemptedModules.reduce((sum, value) => sum + value, 0) / attemptedModules.length)
      : 0;
    
    return {
      masterModules,
      developingModules,
      needsFocusModules,
      countMasterModules,
      countDevelopingModules,
      countNeedsFocusModules,
      countUnattemptedModules,
      overallCompetence,
      totalAttemptedModules: attemptedModules.length,
      totalModules: Object.keys(MODULE_COMPETENCE.values).length
    };
  }, [MODULE_COMPETENCE.values]);
  
  // Om inga värden finns, visa ingenting
  if (competenceData.totalModules === 0) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <h3 className="font-bold text-gray-800 mb-3">Your Competence Level</h3>
      
      <div className="space-y-2">
        <div className={`flex items-center p-2 rounded-md ${competenceData.overallCompetence >= 90 ? 'bg-green-50' : ''}`}>
          <div className="w-4 h-4 bg-green-500 mr-2 rounded-sm"></div>
          <span className="text-sm flex-1">Master level (&gt; 90%)</span>
          {competenceData.overallCompetence >= 90 && <Trophy className="h-4 w-4 text-green-600" />}
          {competenceData.countMasterModules > 0 && (
            <span className="text-xs font-medium bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
              {competenceData.countMasterModules} module{competenceData.countMasterModules > 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className={`flex items-center p-2 rounded-md ${competenceData.overallCompetence >= 60 && competenceData.overallCompetence < 90 ? 'bg-orange-50' : ''}`}>
          <div className="w-4 h-4 bg-orange-500 mr-2 rounded-sm"></div>
          <span className="text-sm flex-1">Developing (60-90%)</span>
          {competenceData.overallCompetence >= 60 && competenceData.overallCompetence < 90 && <Award className="h-4 w-4 text-orange-600" />}
          {competenceData.countDevelopingModules > 0 && (
            <span className="text-xs font-medium bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full">
              {competenceData.countDevelopingModules} module{competenceData.countDevelopingModules > 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className={`flex items-center p-2 rounded-md ${competenceData.overallCompetence > 0 && competenceData.overallCompetence < 60 ? 'bg-red-50' : ''}`}>
          <div className="w-4 h-4 bg-red-500 mr-2 rounded-sm"></div>
          <span className="text-sm flex-1">Needs focus (&lt; 60%)</span>
          {competenceData.overallCompetence > 0 && competenceData.overallCompetence < 60 && <AlertTriangle className="h-4 w-4 text-red-600" />}
          {competenceData.countNeedsFocusModules > 0 && (
            <span className="text-xs font-medium bg-red-200 text-red-800 px-2 py-0.5 rounded-full">
              {competenceData.countNeedsFocusModules} module{competenceData.countNeedsFocusModules > 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        {competenceData.countUnattemptedModules > 0 && (
          <div className="flex items-center p-2 rounded-md">
            <div className="w-4 h-4 bg-gray-300 mr-2 rounded-sm"></div>
            <span className="text-sm flex-1">Not attempted</span>
            <span className="text-xs font-medium bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
              {competenceData.countUnattemptedModules} module{competenceData.countUnattemptedModules > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
      
      {competenceData.overallCompetence > 0 && (
        <div className="mt-3 text-sm text-gray-600">
          <p>Your overall competence: <span className="font-semibold">{competenceData.overallCompetence}%</span></p>
          <p className="text-xs mt-1">{competenceData.totalAttemptedModules} of {competenceData.totalModules} modules attempted</p>
          <p className="mt-1 text-xs">
            {competenceData.overallCompetence < 60 ? 
              "Practice more to improve your competence level." : 
              competenceData.overallCompetence < 90 ? 
                "Keep practicing to reach Master level!" : 
                "Excellent work! You've mastered this content."}
          </p>
        </div>
      )}
    </div>
  );
};

export default CompetenceLevelLegend;