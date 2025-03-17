/**
 * CompetenceManager.ts
 * 
 * This utility centralizes all competence calculations to ensure consistency
 * across the entire application.
 */

type CompetenceData = {
  rawValue: number;
  attempts: number;
  displayValue: number;
};

/**
 * Calculate the raw competence value based on question responses
 * @param correctAnswers Number of correct answers
 * @param totalQuestions Total number of questions
 * @returns Raw competence percentage (0-100)
 */
export const calculateRawCompetence = (
  correctAnswers: number, 
  totalQuestions: number
): number => {
  if (totalQuestions === 0) return 0;
  return Math.min(Math.round((correctAnswers / totalQuestions) * 100), 100);
};

/**
 * Calculate the standardized display competence value
 * This function ensures competence is displayed consistently across the app
 * 
 * @param rawCompetence Raw competence percentage
 * @param correctAttempts Number of correct attempts
 * @returns Standardized competence value for display
 */
export const calculateStandardizedCompetence = (
  rawCompetence: number, 
  correctAttempts: number = 0
): number => {
  // If there are 3 or more correct attempts, set competence to at least 90%
  if (correctAttempts >= 3) {
    return Math.max(rawCompetence, 90);
  }
  
  // If there are 1 or 2 correct attempts, set competence to at least 60%
  if (correctAttempts >= 1) {
    return Math.max(rawCompetence, 60);
  }
  
  // Otherwise return the exact competence value
  return rawCompetence;
};

/**
 * Get the appropriate CSS color class based on competence level
 * @param competenceData Complete competence data object
 * @returns CSS class string for the appropriate color
 */
export const getCompetenceColorClass = (
  rawCompetence: number, 
  correctAttempts: number = 0
): string => {
  const standardizedValue = calculateStandardizedCompetence(rawCompetence, correctAttempts);
  
  if (standardizedValue >= 90) {
    return "bg-green-500";
  } else if (standardizedValue >= 60) {
    return "bg-orange-500";
  } else if (standardizedValue > 0) {
    return "bg-red-500";
  } else {
    return "bg-gray-300";
  }
};

/**
 * Calculate both raw and standardized competence values for a module
 * @param questionResponses Array of question responses with isCorrect and attempts
 * @param totalQuestions Total number of questions in the module
 * @returns Complete competence data object
 */
export const calculateModuleCompetence = (
  questionResponses: {isCorrect: boolean, attempts: number}[],
  totalQuestions: number
): CompetenceData => {
  // Calculate raw competence
  const correctAnswers = questionResponses.filter(response => response.isCorrect).length;
  const rawValue = calculateRawCompetence(correctAnswers, totalQuestions);
  
  // Get the maximum attempt count across all questions
  const maxAttempts = questionResponses.length > 0
    ? Math.max(...questionResponses.map(response => response.attempts))
    : 0;
  
  // Calculate standardized display value
  const displayValue = calculateStandardizedCompetence(rawValue, maxAttempts);
  
  return {
    rawValue,
    attempts: maxAttempts,
    displayValue
  };
};

/**
 * Update competence values when a question is answered
 * @param isCorrect Whether the answer was correct
 * @param currentCompetence Current competence data
 * @returns Updated competence data
 */
export const updateCompetenceAfterAnswer = (
  isCorrect: boolean,
  currentCompetence: CompetenceData
): CompetenceData => {
  // Update raw value
  const rawIncrement = isCorrect ? 10 : -5;
  const newRawValue = Math.max(0, Math.min(100, currentCompetence.rawValue + rawIncrement));
  
  // Update attempts only if correct
  const newAttempts = isCorrect 
    ? currentCompetence.attempts + 1 
    : currentCompetence.attempts;
  
  // Calculate new display value
  const newDisplayValue = calculateStandardizedCompetence(newRawValue, newAttempts);
  
  return {
    rawValue: newRawValue,
    attempts: newAttempts,
    displayValue: newDisplayValue
  };
};

/**
 * Calculate overall course competence from multiple module competence values
 * @param moduleCompetenceValues Array of module competence values
 * @returns Overall course competence percentage
 */
export const calculateOverallCompetence = (
  moduleCompetenceValues: CompetenceData[]
): number => {
  // Filter out modules with zero competence
  const attemptedModules = moduleCompetenceValues.filter(module => module.displayValue > 0);
  
  if (attemptedModules.length === 0) {
    return 0;
  }
  
  // Calculate average of display values for attempted modules
  const sum = attemptedModules.reduce((total, current) => total + current.displayValue, 0);
  return Math.round(sum / attemptedModules.length);
};

export default {
  calculateRawCompetence,
  calculateStandardizedCompetence,
  getCompetenceColorClass,
  calculateModuleCompetence,
  updateCompetenceAfterAnswer,
  calculateOverallCompetence
};