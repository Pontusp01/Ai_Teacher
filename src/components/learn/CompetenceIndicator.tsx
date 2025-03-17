import React from 'react';
import { Trophy, Award, AlertTriangle, Circle } from 'lucide-react';

// Global kompetenshanterare - Ny enkel logik
export const MODULE_COMPETENCE = {
  // Lagrar moduleIndex -> kompetens (0-100)
  values: {} as Record<number, number>,
  
  // Hämta kompetens för en modul
  getValue: (moduleIndex: number): number => {
    // Returnera befintligt värde eller 0
    return MODULE_COMPETENCE.values[moduleIndex] || 0;
  },
  
  // Sätt kompetens för en modul
  setValue: (moduleIndex: number, value: number): void => {
    // Begränsa värdet till 0-100
    const limitedValue = Math.max(0, Math.min(100, Math.round(value)));
    MODULE_COMPETENCE.values[moduleIndex] = limitedValue;
    console.log(`Module ${moduleIndex} competence set to ${limitedValue}%`);
  },
  
  // Uppdatera kompetens för en modul baserat på svar
  updateValue: (moduleIndex: number, isCorrect: boolean): number => {
    // Hämta nuvarande värde
    const currentValue = MODULE_COMPETENCE.getValue(moduleIndex);
    
    // Öka/minska med exakt 5%
    const newValue = isCorrect 
      ? Math.min(100, currentValue + 5) 
      : Math.max(0, currentValue - 5);
    
    // Sätt det nya värdet
    MODULE_COMPETENCE.setValue(moduleIndex, newValue);
    console.log(`Module ${moduleIndex} competence ${isCorrect ? 'increased' : 'decreased'} from ${currentValue}% to ${newValue}%`);
    
    return newValue;
  }
};

interface CompetenceIndicatorProps {
  moduleIndex: number;
}

// Ikoner för olika kompetensnivåer
const CompetenceIndicator: React.FC<CompetenceIndicatorProps> = ({ moduleIndex }) => {
  // Hämta aktuell kompetens från globalt objekt
  const competenceValue = MODULE_COMPETENCE.getValue(moduleIndex);
  
  // Returnera ikonen baserat på kompetens
  if (competenceValue >= 90) {
    return <Trophy className="h-4 w-4 text-green-600" />;
  } else if (competenceValue >= 60) {
    return <Award className="h-4 w-4 text-orange-600" />;
  } else if (competenceValue > 0) {
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  } else {
    return <Circle className="h-4 w-4 text-gray-500" />;
  }
};

// Få lämplig färgklass baserat på kompetens
export const getCompetenceColor = (moduleIndex: number): string => {
  // Hämta aktuell kompetens från globalt objekt
  const competenceValue = MODULE_COMPETENCE.getValue(moduleIndex);
  
  // Returnera färgklass baserat på kompetens
  if (competenceValue >= 90) {
    return "bg-green-500 text-white";
  } else if (competenceValue >= 60) {
    return "bg-orange-500 text-white";
  } else if (competenceValue > 0) {
    return "bg-red-500 text-white";
  } else {
    return "bg-gray-300 text-white";
  }
};

export default CompetenceIndicator;