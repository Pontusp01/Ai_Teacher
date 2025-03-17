import { useToast } from '@/hooks/use-toast';
import { updateCourseProgressInApi } from './progressService';
import { MODULE_COMPETENCE } from '../../components/learn/CompetenceIndicator';

/**
 * Förenklad handler för att markera moduler som klara
 */
export const createModuleCompleteHandler = (
  setCompletedModules: (value: number[]) => void,
  setModuleCompetence: (value: number[]) => void,
  updateCompetence: () => void,
  completedModules: number[],
  moduleCompetence: number[],
  courseId: string,
  toast: ReturnType<typeof useToast>['toast']
) => {
  return (moduleIndex: number, remove: boolean = false) => {
    // Om remove-flaggan är true, ta bort från completedModules
    if (remove) {
      const newCompletedModules = completedModules.filter(index => index !== moduleIndex);
      setCompletedModules(newCompletedModules);
      
      // Uppdatera moduleCompetence (bör redan vara mindre än 100)
      const newModuleCompetence = [...moduleCompetence];
      
      // Sänk kompetens om den var 100%
      if (newModuleCompetence[moduleIndex] === 100) {
        newModuleCompetence[moduleIndex] = 95; // Droppa till 95% istället för gammalt 80%
        
        // Uppdatera också MODULE_COMPETENCE
        MODULE_COMPETENCE.setValue(moduleIndex, 95);
      }
      
      setModuleCompetence(newModuleCompetence);
      
      // Uppdatera API
      updateCourseProgressInApi(courseId, newCompletedModules, toast, newModuleCompetence);
      
      // Visa toast
      toast({
        title: "Module status changed",
        description: "This module is no longer marked as complete.",
        variant: "destructive",
      });
      
      return;
    }
    
    // Annars lägg till i completedModules om det inte redan finns där
    if (!completedModules.includes(moduleIndex)) {
      const newCompletedModules = [...completedModules, moduleIndex];
      setCompletedModules(newCompletedModules);
      
      // Sätt kompetens till 100%
      const newModuleCompetence = [...moduleCompetence];
      newModuleCompetence[moduleIndex] = 100;
      setModuleCompetence(newModuleCompetence);
      
      // Uppdatera också MODULE_COMPETENCE
      MODULE_COMPETENCE.setValue(moduleIndex, 100);
      
      // Uppdatera overall competence
      updateCompetence();
      
      // Uppdatera API
      updateCourseProgressInApi(courseId, newCompletedModules, toast, newModuleCompetence);
      
      // Visa toast
      toast({
        title: "Module completed!",
        description: "Great job! You've completed this module.",
        variant: "default",
      });
    }
  };
};