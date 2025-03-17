import { QuestionResponse } from './types';
import { MODULE_COMPETENCE } from '../../components/learn/CompetenceIndicator';

/**
 * Förenklad uppdatering av kompetens för alla moduler
 * Returnerar exakt samma värden som finns i MODULE_COMPETENCE
 */
export const calculateModuleCompetence = (
  questionResponses: { [moduleIndex: number]: QuestionResponse[] },
  moduleCompetence: number[],
  correctAttempts: number[],
  completedModules: number[],
  onModuleComplete: (moduleIndex: number, remove?: boolean) => void
) => {
  // Skapa kopior av arrays för modifiering
  const newModuleCompetence = [...moduleCompetence];
  const newCorrectAttempts = [...correctAttempts];
  
  // Sätt alla kompletta moduler till 100% kompetens
  completedModules.forEach(moduleIndex => {
    newModuleCompetence[moduleIndex] = 100;
    MODULE_COMPETENCE.setValue(moduleIndex, 100);
  });
  
  // Uppdatera från MODULE_COMPETENCE om det finns värden där
  Object.keys(MODULE_COMPETENCE.values).forEach(moduleIndexStr => {
    const moduleIndex = parseInt(moduleIndexStr);
    const competenceValue = MODULE_COMPETENCE.getValue(moduleIndex);
    
    // Sätt moduleCompetence baserat på MODULE_COMPETENCE
    newModuleCompetence[moduleIndex] = competenceValue;
  });
  
  return {
    newModuleCompetence,
    newCorrectAttempts
  };
};

/**
 * Förenklad beräkning av total kompetens
 * Använder enkelt genomsnitt av alla moduler med värden > 0
 */
export const calculateOverallCompetence = (moduleCompetence: number[]): number => {
  // Filtrera bort moduler med noll kompetens
  const attemptedModules = moduleCompetence.filter(competence => competence > 0);
  
  // Om inga moduler har påbörjats, returnera 0
  if (attemptedModules.length === 0) return 0;
  
  // Beräkna genomsnittlig kompetens för påbörjade moduler
  const sum = attemptedModules.reduce((total, competence) => total + competence, 0);
  return Math.round(sum / attemptedModules.length);
};

/**
 * Återställ all progress för en kurs
 */
export const resetCourseProgress = () => {
  // Rensa även MODULE_COMPETENCE
  Object.keys(MODULE_COMPETENCE.values).forEach(key => {
    delete MODULE_COMPETENCE.values[key];
  });
  
  return {
    newModuleCompetence: [],
    newCorrectAttempts: [],
    newCompletedModules: [],
    newQuestionResponses: {}
  };
};