
import { apiConfig } from './index';
import { Question, AnswerSubmission, AnswerResponse } from '../types';
import { questionsData } from '../mock_data/questions';

/**
 * Get a list of questions or a specific question
 * @param id Optional question ID
 * @returns Promise with questions or a specific question
 */
export const getQuestions = async (id?: string): Promise<Question[] | Question> => {
  if (apiConfig.useMockData) {
    // Use mock data
    if (id) {
      const question = questionsData.find(q => q.id === id);
      if (!question) throw new Error(`Question with ID ${id} not found`);
      return question;
    }
    return questionsData;
  } else {
    // Use real API
    const url = id ? `${apiConfig.baseUrl}/questions/${id}` : `${apiConfig.baseUrl}/questions`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }
    return response.json();
  }
};

/**
 * Submit an answer to a question
 * @param submission Answer submission data
 * @returns Promise with the response to the submission
 */
export const submitAnswer = async (submission: AnswerSubmission): Promise<AnswerResponse> => {
  if (apiConfig.useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find the question
    const question = questionsData.find(q => q.id === submission.questionId);
    if (!question) {
      throw new Error(`Question with ID ${submission.questionId} not found`);
    }
    
    // Check if the answer is correct
    const isCorrect = question.correctAnswer === submission.answer;
    
    return {
      isCorrect,
      feedback: isCorrect ? question.correctFeedback : question.incorrectFeedback,
      reference: question.reference
    };
  } else {
    // Use real API
    const response = await fetch(`${apiConfig.baseUrl}/questions/${submission.questionId}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit answer: ${response.statusText}`);
    }
    
    return response.json();
  }
};
