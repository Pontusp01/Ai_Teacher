// Typer för kurs och moduler
export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  duration?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalModules: number;
  modules?: Module[];
}

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  totalModules: number;
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

export interface User {
  name: string;
}