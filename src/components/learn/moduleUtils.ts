/**
 * Utility-funktioner för att hantera module-relaterade operationer
 */

/**
 * Konverterar moduleId (1-baserat) till moduleIndex (0-baserat)
 */
export const moduleIdToIndex = (moduleId: string | undefined): number | null => {
  if (!moduleId) return null;
  
  const id = parseInt(moduleId);
  if (isNaN(id) || id < 1) return null;
  
  return id - 1; // Convert from 1-based to 0-based index
};

/**
 * Hämtar modultitel baserat på kurs och modulindex
 */
export const getModuleTitle = (courseId: string, moduleIndex: number): string => {
  // COPC Basic Course
  if (courseId === 'course1') {
    const titles = [
      "COPC Introduction",
      "COPC Leadership",
      "COPC Processes",
      "Process Theory",
      "Process Management",
      "Process Control",
      "Process-KPIs"
    ];
    return titles[moduleIndex] || `Module ${moduleIndex + 1}`;
  }
  
  // KPI Implementation Guide
  if (courseId === 'course4') {
    const titles = [
      "Introduction to KPIs",
      "Designing KPIs",
      "Implementing KPIs",
      "KPI Monitoring",
      "KPI Reporting"
    ];
    return titles[moduleIndex] || `Module ${moduleIndex + 1}`;
  }
  
  // Default course
  return `Module ${moduleIndex + 1}`;
};

/**
 * Hämtar kurstitel från kursobjektet
 */
export const getCourseTitle = (course: any | null): string => {
  if (course && course.title) {
    return course.title;
  }
  return "Course";
};