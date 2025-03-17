
import { apiConfig } from '../index';
import { CourseDetails } from '../../types';
import { coursesData, courseProgressData } from '../../mock_data/courses';
import { generateModulesForCourse } from './moduleUtils';

/**
 * Get details for a specific course
 * @param id Course ID
 * @returns Promise with course details
 */
export const getCourseDetails = async (id: string): Promise<CourseDetails> => {
  if (apiConfig.useMockData) {
    // Use mock data
    const course = coursesData.find(c => c.id === id);
    if (!course) throw new Error(`Course with ID ${id} not found`);
    
    // Find the course progress to get accurate module progress
    const courseProgress = courseProgressData.find(p => p.courseId === id);
    
    // Generate module data based on course ID
    let modules = generateModulesForCourse(id);
    
    // If we have course progress, update the module progress from it
    if (courseProgress && courseProgress.modules) {
      // Map through the modules to update progress
      modules = modules.map(module => {
        // Find the corresponding module progress in the course progress data
        const moduleProgress = courseProgress.modules.find(mp => mp.moduleId === module.id);
        if (moduleProgress) {
          return {
            ...module,
            progress: moduleProgress.percentComplete
          };
        }
        return module;
      });
    }
    
    // Count completed modules
    const completedModules = modules.filter(m => m.progress === 100).length;
    
    return {
      ...course,
      modules,
      totalModules: modules.length,
      completedModules,
    };
  } else {
    // Use real API
    const response = await fetch(`${apiConfig.baseUrl}/courses/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch course details: ${response.statusText}`);
    }
    return response.json();
  }
};
