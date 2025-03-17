import { getTotalModulesForCourse } from './moduleUtils';
import { getCourseProgress, updateCourseProgress } from '@/shared/api/courses';

// Flags to prevent recursive API calls
let isUpdatingProgress = false;
let lastUpdateTimestamp = 0;
const MIN_UPDATE_INTERVAL = 5000; // 5 seconds between updates

/**
 * Loads the initial progress for a course
 */
export const loadInitialProgress = async (
  courseId: string,
  setCompletedModules: (modules: number[]) => void,
  calculateCourseProgress: () => void
): Promise<void> => {
  try {
    console.log("Loading initial progress for course:", courseId);
    const progress = await getCourseProgress(courseId);
    if (progress && progress.modules) {
      const completed: number[] = [];
      progress.modules.forEach((module, index) => {
        // Mark as completed if percentComplete is 100
        if (module.percentComplete === 100) {
          completed.push(index);
        }
      });
      setCompletedModules(completed);
      
      // Calculate course progress after setting completed modules
      setTimeout(() => {
        calculateCourseProgress();
        console.log("Initial progress loaded:", completed.length, "completed modules");
      }, 100);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
};

/**
 * Updates the course progress in the API
 */
export const updateCourseProgressInApi = async (
  courseId: string,
  completedModules: number[],
  toastFn: (args: any) => void,
  moduleCompetence?: number[]
): Promise<void> => {
  // Check time difference since last update to prevent rapid firing
  const now = Date.now();
  if (now - lastUpdateTimestamp < MIN_UPDATE_INTERVAL) {
    console.log('Throttling progress update - too soon since last update');
    return;
  }
  
  // Guard against recursive calls
  if (isUpdatingProgress) {
    console.log('Already updating progress, skipping to prevent recursion');
    return;
  }
  
  // Set flags to prevent additional calls
  isUpdatingProgress = true;
  lastUpdateTimestamp = now;
  
  try {
    // Get current progress first
    const currentProgress = await getCourseProgress(courseId);
    
    // Calculate overall course progress based on completed modules
    const totalModules = getTotalModulesForCourse(courseId);
    const percentComplete = Math.round((completedModules.length / totalModules) * 100);
    
    // If percentage hasn't changed and we don't have module competence updates, don't update
    if (currentProgress && 
        currentProgress.percentComplete === percentComplete && 
        !moduleCompetence) {
      console.log('Progress percentage unchanged, skipping update');
      isUpdatingProgress = false;
      return;
    }
    
    // Create module progress data
    const moduleProgressData = Array(totalModules).fill(null).map((_, idx) => {
      // If we have moduleCompetence data, use it; otherwise just use completed status
      let competence = 0;
      
      // First check if module is in completedModules (should be 100%)
      if (completedModules.includes(idx)) {
        competence = 100;
      } 
      // Otherwise use the moduleCompetence array if available
      else if (moduleCompetence && moduleCompetence[idx] !== undefined) {
        competence = moduleCompetence[idx];
      }
      
      return {
        moduleId: `${idx + 1}`,
        percentComplete: competence,
        lastActivity: new Date().toISOString()
      };
    });
    
    console.log(`Updating course progress: ${percentComplete}% - ${completedModules.length} of ${totalModules} modules completed`);
    
    // Store progress data with full module information
    const progressData = {
      courseId,
      percentComplete,
      lastActivity: new Date().toISOString(),
      timeSpent: currentProgress?.timeSpent || 0,
      modules: moduleProgressData
    };
    
    // Store locally in sessionStorage first for immediate feedback
    try {
      sessionStorage.setItem(`${courseId}_progress`, JSON.stringify(progressData));
    } catch (e) {
      console.error("Error storing progress in sessionStorage:", e);
    }
    
    // Then update the API (which might be slower)
    await updateCourseProgress(courseId, progressData);
    
    console.log("Successfully updated course progress with module competence levels");
  } catch (error) {
    console.error('Error updating course progress:', error);
  } finally {
    // Reset the flag with delay to prevent rapid updates
    setTimeout(() => {
      isUpdatingProgress = false;
    }, 2000);
  }
};
