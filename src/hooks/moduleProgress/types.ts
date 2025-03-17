// Types for module progress functionality
export interface QuestionResponse {
  isCorrect: boolean;
  attempts: number;
}

// Enhetlig ProgressState för alla komponenter att använda
export interface ProgressState {
  moduleCompetence: number[];
  correctAttempts: number[];
  questionResponses: { [moduleIndex: number]: QuestionResponse[] };
  correctAnswers: boolean[];
  competenceLevel: number;
  completedModules: number[];
  showCompetenceLevel: boolean;
}

// Bakåtkompatibilitet
export interface ModuleProgressState extends ProgressState {}

// Tillägg för CourseData-funktionalitet
export interface CourseDataState {
  course: any | null;
  courseDetails: any | null;
  progress: any | null;
  isLoading: boolean;
}

export interface CourseDataResult extends CourseDataState {
  setProgress: (updatedProgress: any) => void;
}

// Andra nödvändiga typer
export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalModules: number;
  modules?: Module[];
}

export interface CourseProgress {
  id: string;
  courseId: string;
  userId: string;
  percentComplete: number;
  lastActivity: string;
  completedModules: number[];
  moduleCompetence?: number[];
}