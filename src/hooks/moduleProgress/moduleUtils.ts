
/**
 * Gets the total number of modules for a specific course
 */
export function getTotalModulesForCourse(courseId: string): number {
  if (courseId === 'course1') {
    return 7; // COPC Basic Course has 7 modules
  } else if (courseId === 'course4') {
    return 5; // KPI Implementation Guide has 5 modules
  } else {
    return 3; // Default for other courses
  }
}

/**
 * Calculates the course progress based on completed modules
 */
export const calculateCourseProgress = (completedModules: number[], totalModules: number): number => {
  if (totalModules === 0) return 0;
  
  // Calculate percentage (completed modules / total modules) * 100
  const percentage = Math.round((completedModules.length / totalModules) * 100);
  console.log(`Course progress: ${percentage}% (${completedModules.length}/${totalModules} modules)`);
  return percentage;
};
