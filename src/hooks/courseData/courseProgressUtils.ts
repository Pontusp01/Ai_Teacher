import { CourseProgress, Course } from '@/shared/types';
import { MODULE_COMPETENCE } from '@/components/learn/CompetenceIndicator';

/**
 * Calculate completed modules from the course details
 */
export const calculateCompletedModules = (courseDetails: any) => {
  if (!courseDetails || !courseDetails.modules) return 0;
  return courseDetails.modules.filter((module: any) => module.progress === 100).length;
};

/**
 * Calculate the course progress based on completed modules
 */
export const calculateCourseProgress = (courseDetails: any) => {
  if (!courseDetails) return 0;
  
  const totalModules = courseDetails.totalModules;
  if (totalModules === 0) return 0;
  
  const completedModules = calculateCompletedModules(courseDetails);
  return Math.round((completedModules / totalModules) * 100);
};

/**
 * Update a course with new progress information
 */
export const updateCourseWithProgress = (
  course: Course, 
  progressValue: number
): Course => {
  return {
    ...course,
    progress: progressValue
  };
};

/**
 * Gets the total number of modules for a specific course
 */
export const getTotalModulesForCourse = (courseId: string): number => {
  if (courseId === 'course1') {
    return 7; // COPC Basic Course has 7 modules
  } else if (courseId === 'course4') {
    return 5; // KPI Implementation Guide has 5 modules
  } else {
    return 3; // Default for other courses
  }
};

/**
 * Calculates the course progress based on completed modules array
 */
export const calculateCourseProgressFromArray = (completedModules: number[], totalModules: number): number => {
  if (!completedModules || totalModules === 0) return 0;
  
  // Calculate percentage (completed modules / total modules) * 100
  const percentage = Math.round((completedModules.length / totalModules) * 100);
  console.log(`Course progress: ${percentage}% (${completedModules.length}/${totalModules} modules)`);
  return percentage;
};

/**
 * Resets all course progress
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