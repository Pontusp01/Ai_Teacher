
import { useEffect, useRef, useState } from 'react';
import { loadInitialProgress } from './progressService';
import { hasValidStoredProgress, initializeProgressArrays, loadProgressFromStorage } from './storageUtils';
import { getTotalModulesForCourse } from './moduleUtils';

/**
 * Hook to handle initialization of module progress data
 */
export const useInitialization = (
  courseId: string,
  setModuleCompetence: React.Dispatch<React.SetStateAction<number[]>>,
  setCorrectAttempts: React.Dispatch<React.SetStateAction<number[]>>,
  setCompletedModules: (value: number[]) => void,
  setQuestionResponses: (value: {[moduleIndex: number]: any}) => void,
  calculateInternalCourseProgress: () => void,
) => {
  // Track if initialization has been done
  const hasInitializedRef = useRef(false);
  const [initializationComplete, setInitializationComplete] = useState(false);

  useEffect(() => {
    // Only run initialization once per course
    if (hasInitializedRef.current) return;
    
    console.log("Initializing module progress for course:", courseId);
    hasInitializedRef.current = true;
    
    // First try to load from localStorage
    const storedProgress = loadProgressFromStorage(courseId);
    let shouldLoadFromAPI = true;
    
    // Initialize arrays if empty
    const totalModules = getTotalModulesForCourse(courseId);
    const { initialModuleCompetence, initialCorrectAttempts } = initializeProgressArrays(totalModules);
    
    // If we have stored progress, use it
    if (storedProgress.moduleCompetence && storedProgress.moduleCompetence.length > 0) {
      console.log("Using stored progress from localStorage");
      setModuleCompetence(storedProgress.moduleCompetence);
      
      if (storedProgress.correctAttempts && storedProgress.correctAttempts.length > 0) {
        setCorrectAttempts(storedProgress.correctAttempts);
      } else {
        setCorrectAttempts(initialCorrectAttempts);
      }
      
      if (storedProgress.completedModules && storedProgress.completedModules.length > 0) {
        setCompletedModules(storedProgress.completedModules);
        // We already have completed modules, no need to load from API
        shouldLoadFromAPI = false;
      }
      
      if (storedProgress.questionResponses && Object.keys(storedProgress.questionResponses).length > 0) {
        setQuestionResponses(storedProgress.questionResponses);
      }
    } else {
      // No stored progress, use initial values
      console.log("No stored progress, using initial values");
      setModuleCompetence(initialModuleCompetence);
      setCorrectAttempts(initialCorrectAttempts);
    }
    
    // Load initial progress data from API if needed
    if (shouldLoadFromAPI) {
      console.log("Loading progress from API");
      loadInitialProgress(
        courseId, 
        setCompletedModules, 
        calculateInternalCourseProgress
      ).then(() => {
        setInitializationComplete(true);
      });
    } else {
      // Mark initialization as complete since we're using stored data
      setTimeout(() => {
        calculateInternalCourseProgress();
        setInitializationComplete(true);
      }, 300);
    }
    
    // Clean up function to allow re-initialization when component unmounts
    let timeoutId: number | null = null;
    
    return () => {
      // Allow re-initialization after component unmounts with a delay
      timeoutId = window.setTimeout(() => {
        hasInitializedRef.current = false;
      }, 500);
      
      // Clear the timeout if component unmounts before completion
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [courseId, setModuleCompetence, setCorrectAttempts, setCompletedModules, setQuestionResponses, calculateInternalCourseProgress]);

  return { initializationComplete };
};
