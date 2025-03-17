import { CourseModule } from '../../types';

/**
 * Generate modules for a specific course
 * @param courseId Course ID
 * @returns Array of course modules
 */
export const generateModulesForCourse = (courseId: string): CourseModule[] => {
  switch(courseId) {
    case 'course1': // COPC Basic Course
      return [
        { id: '1', title: 'COPC Introduktion', duration: 2, progress: 0 },
        { id: '2', title: 'COPC Ledarskap', duration: 3, progress: 0 },
        { id: '3', title: 'COPC Processer', duration: 7, progress: 0 },
        { id: '3.1', title: 'Process Theory', duration: 2, progress: 0 },
        { id: '3.2', title: 'Process Management', duration: 2, progress: 0 },
        { id: '3.3', title: 'Process Control', duration: 1, progress: 0 },
        { id: '3.4', title: 'Process-KPIs', duration: 2, progress: 0 },
      ];
    case 'course2': // Business English
      return [
        { id: '1', title: 'Business Communication Basics', duration: 2, progress: 0 },
        { id: '2', title: 'Customer Interaction', duration: 4, progress: 0 },
        { id: '3', title: 'Handling Complaints', duration: 3, progress: 0 },
      ];
    case 'course3': // Product Training
      return [
        { id: '1', title: 'Product Overview', duration: 1, progress: 0 },
        { id: '2', title: 'Technical Specifications', duration: 2, progress: 0 },
        { id: '3', title: 'Troubleshooting', duration: 3, progress: 0 },
      ];
    case 'course4': // KPI Implementation
      return [
        { id: '1', title: 'KPI Fundamentals', duration: 2, progress: 0 },
        { id: '2', title: 'Implementation Strategy', duration: 3, progress: 0 },
        { id: '3', title: 'Monitoring and Reporting', duration: 4, progress: 0 },
      ];
    case 'course5': // COPC CX Standard
      return [
        { id: '1', title: 'What\'s New in 6.2', duration: 1, progress: 0 },
        { id: '2', title: 'Implementation Updates', duration: 2, progress: 0 },
      ];
    case 'course6': // Quality Monitoring
      return [
        { id: '1', title: 'Form Overview', duration: 1, progress: 0 },
        { id: '2', title: 'Scoring Methodology', duration: 2, progress: 0 },
      ];
    default:
      return [];
  }
};
