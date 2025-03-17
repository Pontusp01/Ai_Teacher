
import { apiConfig } from './index';
import { Exam, ExamDetails } from '../types';
import { examsData } from '../mock_data/exams';

/**
 * Get a list of available exams
 * @returns Promise with list of exams
 */
export const getExams = async (): Promise<Exam[]> => {
  if (apiConfig.useMockData) {
    // Use mock data
    return examsData;
  } else {
    // Use real API
    const response = await fetch(`${apiConfig.baseUrl}/exams`);
    if (!response.ok) {
      throw new Error(`Failed to fetch exams: ${response.statusText}`);
    }
    return response.json();
  }
};

/**
 * Get details for a specific exam
 * @param id Exam ID
 * @returns Promise with exam details
 */
export const getExamDetails = async (id: string): Promise<ExamDetails> => {
  if (apiConfig.useMockData) {
    // Use mock data
    const exam = examsData.find(e => e.id === id);
    if (!exam) throw new Error(`Exam with ID ${id} not found`);
    
    // In a real implementation, you'd have more detailed mock data
    return {
      ...exam,
      description: `Läxförhör baserat på ${exam.title}`,
      lastUpdated: "2025-03-10",
      questions: []  // This would have the actual questions in real implementation
    };
  } else {
    // Use real API
    const response = await fetch(`${apiConfig.baseUrl}/exams/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch exam details: ${response.statusText}`);
    }
    return response.json();
  }
};

/**
 * Start an exam
 * @param id Exam ID
 * @returns Promise with the started exam session
 */
export const startExam = async (id: string): Promise<{ sessionId: string; startTime: string; }> => {
  if (apiConfig.useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if exam exists
    const exam = examsData.find(e => e.id === id);
    if (!exam) throw new Error(`Exam with ID ${id} not found`);
    
    // Return a mock session
    return {
      sessionId: `session-${Date.now()}`,
      startTime: new Date().toISOString()
    };
  } else {
    // Use real API
    const response = await fetch(`${apiConfig.baseUrl}/exams/${id}/start`, {
      method: 'POST'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to start exam: ${response.statusText}`);
    }
    
    return response.json();
  }
};
