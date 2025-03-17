
import { apiConfig } from '../index';
import { CourseProgress } from '../../types';
import { courseProgressData, coursesData } from '../../mock_data/courses';

/**
 * Get progress for a specific course
 * @param courseId Course ID
 * @param userId Optional user ID (uses current user if not provided)
 * @returns Promise with course progress
 */
export const getCourseProgress = async (courseId: string, userId?: string): Promise<CourseProgress> => {
  if (apiConfig.useMockData) {
    // Use mock data
    const progress = courseProgressData.find(p => p.courseId === courseId);
    if (!progress) {
      // Return default progress if not found
      console.log(`No progress found for course ${courseId}, initializing to 0%`);
      return {
        courseId,
        percentComplete: 0,
        lastActivity: new Date().toISOString(),
        timeSpent: 0,
        modules: []
      };
    }
    return progress;
  } else {
    // Use real API
    const url = userId
      ? `${apiConfig.baseUrl}/courses/${courseId}/progress/${userId}`
      : `${apiConfig.baseUrl}/courses/${courseId}/progress`;
      
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch course progress: ${response.statusText}`);
    }
    return response.json();
  }
};

/**
 * Update progress for a specific course
 * @param courseId Course ID
 * @param progressData Updated progress data
 * @param userId Optional user ID (uses current user if not provided)
 * @returns Promise with updated course progress
 */
export const updateCourseProgress = async (
  courseId: string, 
  progressData: CourseProgress, 
  userId?: string
): Promise<CourseProgress> => {
  if (apiConfig.useMockData) {
    console.log("Updating course progress:", progressData.percentComplete);
    
    // Update mock data
    const index = courseProgressData.findIndex(p => p.courseId === courseId);
    
    if (index >= 0) {
      // Update existing progress
      courseProgressData[index] = {
        ...courseProgressData[index],
        ...progressData
      };
      
      // Also update the progress in coursesData
      const courseIndex = coursesData.findIndex(c => c.id === courseId);
      if (courseIndex >= 0) {
        coursesData[courseIndex].progress = progressData.percentComplete;
        console.log(`Updated course ${courseId} progress to ${progressData.percentComplete}%`);
      }
      
      return courseProgressData[index];
    } else {
      // Add new progress
      courseProgressData.push(progressData);
      
      // Also update the progress in coursesData
      const courseIndex = coursesData.findIndex(c => c.id === courseId);
      if (courseIndex >= 0) {
        coursesData[courseIndex].progress = progressData.percentComplete;
        console.log(`Added new progress for course ${courseId}: ${progressData.percentComplete}%`);
      }
      
      return progressData;
    }
  } else {
    // Use real API
    const url = userId
      ? `${apiConfig.baseUrl}/courses/${courseId}/progress/${userId}`
      : `${apiConfig.baseUrl}/courses/${courseId}/progress`;
      
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(progressData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update course progress: ${response.statusText}`);
    }
    
    return response.json();
  }
};
