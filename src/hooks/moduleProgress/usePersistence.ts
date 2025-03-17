
import { useEffect, useCallback, useRef } from 'react';
import { updateCourseProgressInApi } from './progressService';
import { saveProgressToStorage } from './storageUtils';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook to handle persisting module progress data
 */
export const usePersistence = (
  courseId: string,
  moduleCompetence: number[],
  correctAttempts: number[],
  completedModules: number[],
  questionResponses: {[moduleIndex: number]: any},
  setModuleCompetence: React.Dispatch<React.SetStateAction<number[]>>,
  setCorrectAttempts: React.Dispatch<React.SetStateAction<number[]>>,
  setCompletedModules: (value: number[]) => void,
  setQuestionResponses: (value: {[moduleIndex: number]: any}) => void,
  updateAllModuleCompetence: () => void,
  lastUpdateTimestamp: number,
  setLastUpdateTimestamp: React.Dispatch<React.SetStateAction<number>>
) => {
  const { toast } = useToast();
  const isUpdatingRef = useRef(false);
  const lastVisibilityChange = useRef<number>(Date.now());
  
  // Force update progress - useful for sync
  const forceUpdateProgress = useCallback(async (): Promise<void> => {
    // Guard against too frequent updates
    const now = Date.now();
    if (now - lastUpdateTimestamp < 1000) {
      console.log('Skipping update - too soon since last update');
      return;
    }
    
    // Set flag to prevent recursive updates
    if (isUpdatingRef.current) {
      console.log('Already updating progress, skipping');
      return;
    }
    
    isUpdatingRef.current = true;
    setLastUpdateTimestamp(now);
    
    try {
      console.log("Progress saved to localStorage for course", courseId);
      
      // Ensure all modules with completedModules are set to 100% in moduleCompetence
      const syncedModuleCompetence = [...moduleCompetence];
      completedModules.forEach(moduleIndex => {
        syncedModuleCompetence[moduleIndex] = 100;
      });
      
      // Save synced data to local storage first (for immediate feedback)
      saveProgressToStorage(
        courseId,
        syncedModuleCompetence,
        correctAttempts,
        completedModules,
        questionResponses
      );
      
      // Then update the API (which might be slower)
      await updateCourseProgressInApi(courseId, completedModules, toast, syncedModuleCompetence)
        .then(() => {
          console.log("Course progress saved successfully");
          // Update sessionStorage for development page to read
          try {
            const progressData = {
              courseId,
              percentComplete: Math.round((completedModules.length / syncedModuleCompetence.length) * 100),
              lastActivity: new Date().toISOString(),
              modules: syncedModuleCompetence.map((competence, index) => ({
                moduleId: `${index + 1}`,
                percentComplete: completedModules.includes(index) ? 100 : competence,
                lastActivity: new Date().toISOString()
              }))
            };
            sessionStorage.setItem(`${courseId}_progress`, JSON.stringify(progressData));
          } catch (e) {
            console.error("Error updating sessionStorage:", e);
          }
        })
        .catch((error) => {
          console.error("Error saving course progress:", error);
        });
    } finally {
      // Reset the flag after a delay to prevent rapid updates
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 500);
    }
  }, [
    courseId,
    moduleCompetence,
    correctAttempts,
    completedModules,
    questionResponses,
    toast,
    lastUpdateTimestamp,
    setLastUpdateTimestamp
  ]);
  
  // Save progress when values change
  useEffect(() => {
    // Skip if we're in the middle of an update
    if (isUpdatingRef.current) return;
    
    const timer = setTimeout(() => {
      forceUpdateProgress();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [
    courseId,
    moduleCompetence,
    correctAttempts,
    completedModules,
    forceUpdateProgress
  ]);
  
  // Update progress when page visibility changes (coming back from another tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        // Only update if we've been away for a while (at least 1 second)
        if (now - lastVisibilityChange.current > 1000) {
          lastVisibilityChange.current = now;
          
          // Force an update of all module competence on return
          setTimeout(() => {
            updateAllModuleCompetence();
            forceUpdateProgress();
          }, 500);
        }
      } else {
        lastVisibilityChange.current = Date.now();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [forceUpdateProgress, updateAllModuleCompetence]);

  return { forceUpdateProgress };
};
