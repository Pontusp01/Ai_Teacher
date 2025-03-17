import { QuestionResponse } from './types';
import { updateCourseProgressInApi } from './progressService';
import { useToast } from '@/hooks/use-toast';
import { MODULE_COMPETENCE } from '../../components/learn/CompetenceIndicator';

/**
 * Förenklad handler för att spara svar och uppdatera kompetens
 * 5% ökning för rätt svar, 5% minskning för fel svar
 */
export const createAnswerHandler = (
  setCorrectAnswers: (value: boolean[]) => void,
  setQuestionResponses: (value: {[moduleIndex: number]: QuestionResponse[]}) => void,
  setCorrectAttempts: (value: number[]) => void,
  setModuleCompetence: (value: number[]) => void,
  updateCompetence: () => void,
  handleModuleComplete: (moduleIndex: number, remove?: boolean) => void,
  toast: ReturnType<typeof useToast>['toast'],
  courseId: string,
  correctAnswers: boolean[],
  questionResponses: {[moduleIndex: number]: QuestionResponse[]},
  correctAttempts: number[],
  moduleCompetence: number[],
  completedModules: number[]
) => {
  // Skydd mot samtidiga anrop
  let isProcessing = false;
  
  return (isCorrect: boolean, moduleIndex: number, questionIndex: number = 0) => {
    // Förhindra samtidig bearbetning
    if (isProcessing) {
      console.log('Answer processing already in progress, ignoring this call');
      return;
    }
    
    isProcessing = true;
    
    try {
      console.log(`Processing answer: ${isCorrect ? 'Correct' : 'Incorrect'} for module ${moduleIndex}, question ${questionIndex}`);
      
      // Uppdatera correct answers (för den aktuella modulen)
      const newCorrectAnswers = [...correctAnswers];
      newCorrectAnswers[moduleIndex] = isCorrect;
      setCorrectAnswers(newCorrectAnswers);
      
      // Uppdatera question responses (för den aktuella modulen)
      const moduleResponses = questionResponses[moduleIndex] || [];
      const updatedModuleResponses = [...moduleResponses];
      
      if (questionIndex < updatedModuleResponses.length) {
        updatedModuleResponses[questionIndex] = { 
          isCorrect,
          attempts: updatedModuleResponses[questionIndex].attempts + 1
        };
      } else {
        updatedModuleResponses.push({ isCorrect, attempts: 1 });
      }
      
      const newQuestionResponses = {
        ...questionResponses,
        [moduleIndex]: updatedModuleResponses
      };
      setQuestionResponses(newQuestionResponses);
      
      // Uppdatera correct attempts (för bakåtkompatibilitet)
      const newCorrectAttempts = [...correctAttempts];
      if (isCorrect) {
        newCorrectAttempts[moduleIndex] = Math.min((newCorrectAttempts[moduleIndex] || 0) + 1, 3);
      } else {
        newCorrectAttempts[moduleIndex] = Math.max((newCorrectAttempts[moduleIndex] || 0) - 1, 0);
      }
      setCorrectAttempts(newCorrectAttempts);
      
      // FÖRENKLADE KOMPETENSUPPDATERINGAR - EXAKT +5%/-5%
      
      // Spara tidigare kompetens
      const previousCompetence = moduleCompetence[moduleIndex] || 0;
      
      // Skapa en kopia av moduleCompetence
      let newModuleCompetence = [...moduleCompetence];
      
      // ENKEL +5%/-5% UPPDATERING
      if (isCorrect) {
        // +5% för rätt svar (max 100%)
        newModuleCompetence[moduleIndex] = Math.min(100, previousCompetence + 5);
        
        // Om kompetensen når 100%, markera modulen som klar
        if (newModuleCompetence[moduleIndex] === 100 && !completedModules.includes(moduleIndex)) {
          handleModuleComplete(moduleIndex);
        }
      } else {
        // -5% för fel svar (min 0%)
        newModuleCompetence[moduleIndex] = Math.max(0, previousCompetence - 5);
        
        // Om modulen var klar men kompetensen sjunker, avmarkera den
        if (previousCompetence === 100 && completedModules.includes(moduleIndex)) {
          handleModuleComplete(moduleIndex, true);
        }
      }
      
      // Uppdatera MODULE_COMPETENCE också
      MODULE_COMPETENCE.setValue(moduleIndex, newModuleCompetence[moduleIndex]);
      
      console.log(`Module ${moduleIndex} competence updated: ${previousCompetence}% -> ${newModuleCompetence[moduleIndex]}%`);
      setModuleCompetence(newModuleCompetence);
      
      // Uppdatera overall competence
      updateCompetence();
      
      // Skicka till API
      updateCourseProgressInApi(courseId, completedModules, toast, newModuleCompetence);
      
      // Visa toast-meddelande
      const competenceChanged = newModuleCompetence[moduleIndex] !== previousCompetence;
      const competenceIncreased = newModuleCompetence[moduleIndex] > previousCompetence;
      
      toast({
        title: isCorrect ? "Correct answer!" : "Incorrect answer",
        description: isCorrect 
          ? `Great job!${competenceChanged && competenceIncreased ? " (+5%)" : ""}`
          : `Review the material and try again.${competenceChanged ? " (-5%)" : ""}`,
        variant: isCorrect ? "default" : "destructive",
      });
    } finally {
      // Frigör låset efter kort fördröjning
      setTimeout(() => {
        isProcessing = false;
      }, 1000);
    }
  };
};