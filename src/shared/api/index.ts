
// Central API handler for the application
// This file acts as a facade for all API calls, making it easy to switch between
// mock data and real API calls in the future

import { getQuestions, submitAnswer } from './questions';
import { getCourses, getCourseDetails, getCourseProgress, updateCourseProgress } from './courses';
import { getWebSources, addWebSource } from './webSources';
import { getLearningMaterials, getLearningMaterial, uploadLearningMaterial } from './learningMaterials';
import { getExams, getExamDetails, startExam } from './exams';
import { getDocuments, getDocumentDetails } from './documents';

// Export all API functions
export {
  // Questions API
  getQuestions,
  submitAnswer,
  
  // Courses API
  getCourses,
  getCourseDetails,
  getCourseProgress,
  updateCourseProgress,
  
  // Web Sources API
  getWebSources,
  addWebSource,
  
  // Learning Materials API
  getLearningMaterials,
  getLearningMaterial,
  uploadLearningMaterial,
  
  // Exams API
  getExams,
  getExamDetails,
  startExam,
  
  // Documents API
  getDocuments,
  getDocumentDetails
};

// Re-export the documents api functions
export * from './documents';

// Config to determine whether to use mock data or real API
export const apiConfig = {
  useMockData: true, // Set to false to use real API
  baseUrl: 'https://api.example.com', // Base URL for real API
};
