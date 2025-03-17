
import { ModuleProgressState } from './types';

/**
 * Saves module progress state to localStorage with improved handling and validation
 */
export const saveProgressToStorage = (
  courseId: string,
  moduleCompetence: number[],
  correctAttempts: number[],
  completedModules: number[],
  questionResponses: {[moduleIndex: number]: any}
) => {
  if (moduleCompetence.length > 0) {
    try {
      // Store with timestamp to track freshness
      const storageData = {
        moduleCompetence,
        correctAttempts,
        completedModules,
        questionResponses: Object.keys(questionResponses).length > 0 ? questionResponses : {},
        timestamp: Date.now()
      };
      
      localStorage.setItem(`${courseId}_moduleProgress`, JSON.stringify(storageData));
      console.log(`Progress saved to localStorage for course ${courseId}`);
    } catch (e) {
      console.error("Error saving progress to storage:", e);
    }
  }
};

/**
 * Loads module progress state from localStorage with improved validation
 */
export const loadProgressFromStorage = (courseId: string): Partial<ModuleProgressState> => {
  try {
    const storedData = localStorage.getItem(`${courseId}_moduleProgress`);
    
    if (!storedData) {
      console.log(`No stored progress found for course ${courseId}`);
      return {};
    }
    
    const parsedData = JSON.parse(storedData);
    
    // Validate parsedData structure to prevent errors
    if (!parsedData.moduleCompetence || !Array.isArray(parsedData.moduleCompetence)) {
      console.warn(`Invalid moduleCompetence format for course ${courseId}`);
      return {};
    }
    
    console.log(`Loaded progress from localStorage for course ${courseId}`, {
      moduleCompetence: parsedData.moduleCompetence?.length || 0,
      completedModules: parsedData.completedModules?.length || 0
    });
    
    return {
      moduleCompetence: parsedData.moduleCompetence,
      correctAttempts: Array.isArray(parsedData.correctAttempts) ? parsedData.correctAttempts : [],
      completedModules: Array.isArray(parsedData.completedModules) ? parsedData.completedModules : [],
      questionResponses: typeof parsedData.questionResponses === 'object' ? parsedData.questionResponses : {}
    };
  } catch (e) {
    console.error("Error loading progress from storage:", e);
    return {};
  }
};

/**
 * Initializes module arrays to the correct length
 */
export const initializeProgressArrays = (totalModules: number) => {
  const initialModuleCompetence = Array(totalModules).fill(0);
  const initialCorrectAttempts = Array(totalModules).fill(0);
  
  return {
    initialModuleCompetence,
    initialCorrectAttempts
  };
};

/**
 * Clears the module progress state from localStorage
 * This is useful for debugging or resetting progress
 */
export const clearProgressFromStorage = (courseId: string) => {
  try {
    localStorage.removeItem(`${courseId}_moduleProgress`);
    console.log(`Progress cleared from localStorage for course ${courseId}`);
  } catch (e) {
    console.error("Error clearing progress from storage:", e);
  }
};

/**
 * Check if stored progress exists and is valid
 */
export const hasValidStoredProgress = (courseId: string): boolean => {
  try {
    const storedData = localStorage.getItem(`${courseId}_moduleProgress`);
    if (!storedData) return false;
    
    const parsedData = JSON.parse(storedData);
    return (
      Array.isArray(parsedData.moduleCompetence) && 
      parsedData.moduleCompetence.length > 0
    );
  } catch (e) {
    return false;
  }
};
