
import { useState, useEffect, useCallback, useRef } from 'react';
import { Course, CourseProgress } from '@/shared/types';
import { useCourseDataFetcher } from './useCourseDataFetcher';
import { CourseDataResult } from './types';
import { updateCourseWithProgress } from './courseProgressUtils';
import { updateCourseProgress } from '@/shared/api/courses';

export * from './types';
export * from './courseProgressUtils';

export const useCourseData = (courseId: string): CourseDataResult => {
  const { course: initialCourse, courseDetails, progress: initialProgress, isLoading } = useCourseDataFetcher(courseId);
  
  // Create state for course and progress so we can update them
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  
  // Use refs to prevent recursive updates
  const isUpdatingRef = useRef(false);
  const updateTimeoutRef = useRef<number | null>(null);
  const progressValueRef = useRef<number | null>(null);
  
  // Update local state when fetched data changes
  useEffect(() => {
    // Skip if we're already updating progress
    if (isUpdatingRef.current) return;
    
    if (initialCourse) {
      // Check if we have a stored course with progress data in localStorage
      const storedCourse = localStorage.getItem(`${courseId}_course`);
      if (storedCourse) {
        try {
          const parsedCourse = JSON.parse(storedCourse);
          // Use stored course if it has valid progress data
          if (typeof parsedCourse.progress === 'number') {
            console.log(`Using stored course from localStorage with progress: ${parsedCourse.progress}%`);
            setCourse(parsedCourse);
            return;
          }
        } catch (e) {
          console.error("Error parsing stored course:", e);
        }
      }
      setCourse(initialCourse);
    }
    
    if (initialProgress && !progress) {
      // Check if we have stored progress in localStorage
      const storedProgress = localStorage.getItem(`${courseId}_progress`);
      if (storedProgress) {
        try {
          const parsedProgress = JSON.parse(storedProgress);
          // Only use stored progress if it's from the current session (last 24h)
          const lastUpdateTime = new Date(parsedProgress.lastActivity).getTime();
          const currentTime = new Date().getTime();
          
          if (currentTime - lastUpdateTime < 24 * 60 * 60 * 1000) {
            console.log(`Using stored progress from localStorage: ${parsedProgress.percentComplete}%`);
            setProgress(parsedProgress);
            progressValueRef.current = parsedProgress.percentComplete;
            return;
          }
        } catch (e) {
          console.error("Error parsing stored progress:", e);
        }
      }
      
      setProgress(initialProgress);
      progressValueRef.current = initialProgress.percentComplete;
    }
  }, [initialCourse, initialProgress, courseId, progress]);

  // Store progress in localStorage to persist between page changes
  useEffect(() => {
    if (progress) {
      try {
        localStorage.setItem(`${courseId}_progress`, JSON.stringify(progress));
      } catch (e) {
        console.error("Error storing progress in localStorage:", e);
      }
    }
  }, [progress, courseId]);
  
  // Store course in localStorage
  useEffect(() => {
    if (course) {
      try {
        localStorage.setItem(`${courseId}_course`, JSON.stringify(course));
      } catch (e) {
        console.error("Error storing course in localStorage:", e);
      }
    }
  }, [course, courseId]);
  
  // Create a wrapper for setProgress that also updates the course object
  const handleProgressUpdate = useCallback(async (updatedProgress: CourseProgress) => {
    // Guard against recursive updates
    if (isUpdatingRef.current) {
      return;
    }
    
    // Check if the value actually changed
    if (progressValueRef.current === updatedProgress.percentComplete) {
      console.log("Progress percentage unchanged, skipping update");
      return;
    }
    
    // Update reference value
    progressValueRef.current = updatedProgress.percentComplete;
    
    // Cancel any existing timeout
    if (updateTimeoutRef.current) {
      window.clearTimeout(updateTimeoutRef.current);
    }
    
    isUpdatingRef.current = true;
    
    // Use timeout to debounce updates
    updateTimeoutRef.current = window.setTimeout(async () => {
      try {
        // Update the progress state
        setProgress(updatedProgress);
        
        // Update the course progress in the course object
        if (course) {
          const updatedCourse = updateCourseWithProgress(course, updatedProgress.percentComplete);
          setCourse(updatedCourse);
          console.log("Updated course progress:", updatedProgress.percentComplete);
          
          // Store the updated course in localStorage
          try {
            localStorage.setItem(`${courseId}_course`, JSON.stringify(updatedCourse));
          } catch (e) {
            console.error("Error storing course in localStorage:", e);
          }
        }
        
        // Try to persist progress to API
        try {
          await updateCourseProgress(courseId, updatedProgress);
          console.log("Progress saved to API successfully");
        } catch (error) {
          console.error("Failed to save progress to API:", error);
        }
      } finally {
        // Reset the update flag after a delay
        setTimeout(() => {
          isUpdatingRef.current = false;
          updateTimeoutRef.current = null;
        }, 2000);
      }
    }, 1000); // Debounce time
    
    // Cleanup function
    return () => {
      if (updateTimeoutRef.current) {
        window.clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [course, courseId]);

  return { 
    course, 
    courseDetails, 
    progress, 
    isLoading,
    setProgress: handleProgressUpdate
  };
};
