
// Re-export from the refactored module
export { 
  useModuleProgress,
  getTotalModulesForCourse,
  calculateCourseProgress
} from './moduleProgress';
export type { 
  QuestionResponse,
  ModuleProgressState 
} from './moduleProgress/types';
