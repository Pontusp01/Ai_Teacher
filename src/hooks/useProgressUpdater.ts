import { useEffect } from 'react';
import { CourseProgress } from '@/shared/types';
import { calculateCourseProgressFromArray } from './courseData/courseProgressUtils';
import { MODULE_COMPETENCE } from '@/components/learn/CompetenceIndicator';

/**
 * Hook som uppdaterar course progress baserat på moduleProgress
 * Synkroniserar completedModules och progress percentage
 */
export const useProgressUpdater = (
  courseId: string,
  progress: CourseProgress | null,
  setProgress: ((updatedProgress: CourseProgress) => void) | undefined,
  moduleProgress: {
    moduleCompetence: number[];
    correctAttempts: number[];
    competenceLevel: number;
    showCompetenceLevel: boolean;
    questionResponses: {[moduleIndex: number]: any[]};
    completedModules: number[];
  } | undefined,  // Markera som potentiellt undefined
  getTotalModulesForCourse: (courseId: string) => number
) => {
  useEffect(() => {
    // Skip if no progress setter or no module progress
    if (!setProgress || !progress || !moduleProgress) {
      return;
    }

    // Debounce to reduce updates
    const updateTimer = setTimeout(() => {
      try {
        // Get the total number of modules for this course
        const totalModules = getTotalModulesForCourse(courseId);
        
        // Guard against undefined moduleProgress
        if (!moduleProgress.completedModules) {
          console.warn('moduleProgress.completedModules is undefined, skipping update');
          return;
        }
        
        // Synkronisera MODULE_COMPETENCE-värden
        if (moduleProgress.moduleCompetence && moduleProgress.moduleCompetence.length > 0) {
          moduleProgress.moduleCompetence.forEach((value, index) => {
            if (value > 0) {
              MODULE_COMPETENCE.setValue(index, value);
            }
          });
        }
        
        // Calculate progress percentage based on completed modules
        const percentComplete = calculateCourseProgressFromArray(
          moduleProgress.completedModules,
          totalModules
        );
        
        // Only update if percentage has changed to avoid unnecessary renders
        if (percentComplete !== progress.percentComplete) {
          const updatedProgress: CourseProgress = {
            ...progress,
            percentComplete,
            completedModules: moduleProgress.completedModules,
            // Include moduleCompetence values in the course progress
            moduleCompetence: moduleProgress.moduleCompetence,
            lastActivity: new Date().toISOString()
          };
          
          console.log(`Updating course progress to ${percentComplete}%`);
          setProgress(updatedProgress);
        }
        
        // Also update if completedModules changed but percentage didn't
        // This catches edge cases like adding/removing modules
        const currentCompletedModulesStr = JSON.stringify(progress.completedModules || []);
        const newCompletedModulesStr = JSON.stringify(moduleProgress.completedModules);
        
        if (currentCompletedModulesStr !== newCompletedModulesStr) {
          const updatedProgress: CourseProgress = {
            ...progress,
            percentComplete, // Use same percentage
            completedModules: moduleProgress.completedModules,
            // Include moduleCompetence values in the course progress
            moduleCompetence: moduleProgress.moduleCompetence,
            lastActivity: new Date().toISOString()
          };
          
          console.log(`Updating completed modules: ${newCompletedModulesStr}`);
          setProgress(updatedProgress);
        }
      } catch (error) {
        console.error('Error updating course progress:', error);
      }
    }, 1000); // Delay updates to avoid too many API calls
    
    return () => clearTimeout(updateTimer);
  }, [
    progress,
    setProgress,
    courseId,
    moduleProgress,
    getTotalModulesForCourse
  ]);
};