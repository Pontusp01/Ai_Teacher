
import { Course, CourseProgress, CourseDetails } from '@/shared/types';

export interface CourseDataState {
  course: Course | null;
  courseDetails: CourseDetails | null;
  progress: CourseProgress | null;
  isLoading: boolean;
}

export interface CourseDataResult extends CourseDataState {
  setProgress: (updatedProgress: CourseProgress) => void;
}
