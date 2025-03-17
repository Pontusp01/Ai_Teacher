
import { apiConfig } from '../index';
import { Course } from '../../types';
import { coursesData } from '../../mock_data/courses';

/**
 * Get a list of all courses
 * @returns Promise with list of courses
 */
export const getCourses = async (): Promise<Course[]> => {
  if (apiConfig.useMockData) {
    // Use mock data
    return coursesData;
  } else {
    // Use real API
    const response = await fetch(`${apiConfig.baseUrl}/courses`);
    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }
    return response.json();
  }
};
