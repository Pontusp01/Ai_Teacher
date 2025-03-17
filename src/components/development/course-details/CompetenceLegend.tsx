import React from 'react';

interface CompetenceLegendProps {
  countMasterModules: number;
  countDevelopingModules: number;
  countNeedsFocusModules: number;
  countUnattemptedModules: number;
}

// Minimal CompetenceLegend - tom för att ta bort all kompetensvisning
const CompetenceLegend: React.FC<CompetenceLegendProps> = () => {
  // Returnera null för att inte visa något alls
  return null;
};

export default CompetenceLegend;