import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createAnswerHandler } from './answerHandlers';
import { createModuleCompleteHandler } from './moduleCompletionHandlers';
import { calculateModuleCompetence, calculateOverallCompetence, resetCourseProgress } from './competenceUtils';
import { QuestionResponse, ProgressState } from './types';
import { MODULE_COMPETENCE } from '../../components/learn/CompetenceIndicator';

/**
 * Hook för att hantera modulernas progress
 */
export const useModuleProgress = (courseId: string) => {
  const { toast } = useToast();
  
  // State för progress - med default-värden
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);
  const [questionResponses, setQuestionResponses] = useState<{[moduleIndex: number]: QuestionResponse[]}>({});
  const [correctAttempts, setCorrectAttempts] = useState<number[]>([]);
  const [moduleCompetence, setModuleCompetence] = useState<number[]>([]);
  const [competenceLevel, setCompetenceLevel] = useState<number>(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [showCompetenceLevel, setShowCompetenceLevel] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
  // Ladda från localStorage om det finns
  useEffect(() => {
    try {
      const storedState = localStorage.getItem(`moduleProgress_${courseId}`);
      if (storedState) {
        const parsedState = JSON.parse(storedState) as ProgressState;
        
        // Uppdatera alla states - med null-checks
        setCorrectAnswers(parsedState.correctAnswers || []);
        setQuestionResponses(parsedState.questionResponses || {});
        setCorrectAttempts(parsedState.correctAttempts || []);
        setModuleCompetence(parsedState.moduleCompetence || []);
        setCompetenceLevel(parsedState.competenceLevel || 0);
        setCompletedModules(parsedState.completedModules || []);
        setShowCompetenceLevel(parsedState.showCompetenceLevel || false);
        
        // Uppdatera MODULE_COMPETENCE
        if (parsedState.moduleCompetence) {
          parsedState.moduleCompetence.forEach((value, index) => {
            if (value > 0) {
              MODULE_COMPETENCE.setValue(index, value);
            }
          });
        }
        
        console.log('Module progress loaded from localStorage');
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Error loading module progress:', error);
      setIsInitialized(true);
    }
  }, [courseId]);
  
  // Spara till localStorage när states uppdateras
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      const progressState: ProgressState = {
        correctAnswers,
        questionResponses,
        correctAttempts,
        moduleCompetence,
        competenceLevel,
        completedModules,
        showCompetenceLevel
      };
      
      localStorage.setItem(`moduleProgress_${courseId}`, JSON.stringify(progressState));
    } catch (error) {
      console.error('Error saving module progress:', error);
    }
  }, [
    isInitialized,
    courseId,
    correctAnswers,
    questionResponses,
    correctAttempts,
    moduleCompetence,
    competenceLevel,
    completedModules,
    showCompetenceLevel
  ]);
  
  // Callback för att uppdatera total kompetens
  const updateCompetence = useCallback(() => {
    const overallCompetence = calculateOverallCompetence(moduleCompetence);
    setCompetenceLevel(overallCompetence);
    setShowCompetenceLevel(true);
  }, [moduleCompetence]);
  
  // Callback för att beräkna och uppdatera kompetens för alla moduler
  const recalculateModuleCompetence = useCallback(() => {
    const { newModuleCompetence, newCorrectAttempts } = calculateModuleCompetence(
      questionResponses,
      moduleCompetence,
      correctAttempts,
      completedModules,
      handleModuleComplete
    );
    
    setModuleCompetence(newModuleCompetence);
    setCorrectAttempts(newCorrectAttempts);
    updateCompetence();
  }, [
    questionResponses,
    moduleCompetence,
    correctAttempts,
    completedModules,
    updateCompetence
  ]);
  
  // Hanterare för att spara svar
  const handleSaveAnswer = createAnswerHandler(
    setCorrectAnswers,
    setQuestionResponses,
    setCorrectAttempts,
    setModuleCompetence,
    updateCompetence,
    handleModuleComplete,
    toast,
    courseId,
    correctAnswers,
    questionResponses,
    correctAttempts,
    moduleCompetence,
    completedModules
  );
  
  // Hanterare för att markera moduler som klara
  function handleModuleComplete(moduleIndex: number, remove: boolean = false) {
    createModuleCompleteHandler(
      setCompletedModules,
      setModuleCompetence,
      updateCompetence,
      completedModules,
      moduleCompetence,
      courseId,
      toast
    )(moduleIndex, remove);
  }
  
  // Återställ all progress
  const resetProgress = useCallback(() => {
    const { newModuleCompetence, newCorrectAttempts, newCompletedModules, newQuestionResponses } = resetCourseProgress();
    
    setCorrectAnswers([]);
    setQuestionResponses(newQuestionResponses);
    setCorrectAttempts(newCorrectAttempts);
    setModuleCompetence(newModuleCompetence);
    setCompetenceLevel(0);
    setCompletedModules(newCompletedModules);
    setShowCompetenceLevel(false);
    
    // Rensa localStorage
    localStorage.removeItem(`moduleProgress_${courseId}`);
    
    toast({
      title: "Progress reset",
      description: "Your course progress has been reset.",
      variant: "default",
    });
  }, [courseId, toast]);
  
  // Uppdatera kompetens när komponenten monteras
  useEffect(() => {
    if (isInitialized && moduleCompetence.length > 0) {
      updateCompetence();
    }
  }, [isInitialized, moduleCompetence, updateCompetence]);
  
  return {
    correctAnswers,
    questionResponses,
    correctAttempts,
    moduleCompetence,
    competenceLevel,
    completedModules,
    showCompetenceLevel,
    handleSaveAnswer,
    handleModuleComplete,
    recalculateModuleCompetence,
    resetProgress,
    isInitialized
  };
};