
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getCourses, getCourseProgress, getCourseDetails } from '@/shared/api';
import { Course, CourseProgress, CourseDetails } from '@/shared/types';
import { CourseDataState } from './types';
import { updateCourseWithProgress } from './courseProgressUtils';

export const useCourseDataFetcher = (courseId: string): CourseDataState => {
  const [course, setCourse] = useState<Course | null>(null);
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourseData = async () => {
      setIsLoading(true);
      try {
        // Get the list of courses
        const courses = await getCourses();
        const selectedCourse = courses.find(c => c.id === courseId);
        
        if (selectedCourse) {
          setCourse(selectedCourse);
          
          // Get detailed course information
          const details = await getCourseDetails(courseId);
          setCourseDetails(details);
          
          // Also get the course progress
          const courseProgress = await getCourseProgress(courseId);
          
          // Ensure progress starts at 0
          if (courseProgress) {
            setProgress(courseProgress);
            
            // Make sure course progress is consistent with the course object
            if (selectedCourse.progress !== courseProgress.percentComplete) {
              const updatedCourse = updateCourseWithProgress(
                selectedCourse, 
                courseProgress.percentComplete
              );
              setCourse(updatedCourse);
              console.log(`Synchronized course progress: ${courseProgress.percentComplete}%`);
            }
          }
        } else {
          toast({
            title: "Error",
            description: "Course not found",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast({
          title: "Error",
          description: "Failed to load course data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId, toast]);

  return { course, courseDetails, progress, isLoading };
};
