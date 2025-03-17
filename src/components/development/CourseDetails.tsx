
import React, { useEffect, useState } from 'react';
import { Course } from '@/shared/types';
import { useCourseData } from '@/hooks/useCourseData';
import { ProgressSummary, ModulesList } from './course-details';
import { hasValidStoredProgress, loadProgressFromStorage } from '@/hooks/moduleProgress/storageUtils';
import { getTotalModulesForCourse } from '@/hooks/moduleProgress/moduleUtils';

interface CourseDetailsProps {
  course: Course;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  // Fetch detailed course data
  const { courseDetails, progress, isLoading } = useCourseData(course.id);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [localModules, setLocalModules] = useState<any[]>([]);
  const [isLocalProgressAvailable, setIsLocalProgressAvailable] = useState(false);
  
  // Load local progress data if available
  useEffect(() => {
    const checkLocalProgress = () => {
      const hasLocalProgress = hasValidStoredProgress(course.id);
      setIsLocalProgressAvailable(hasLocalProgress);
      
      // Try loading from localStorage first
      if (hasLocalProgress) {
        const storedData = loadProgressFromStorage(course.id);
        if (storedData.moduleCompetence) {
          const totalModules = getTotalModulesForCourse(course.id);
          const localModuleData = storedData.moduleCompetence.map((competence, index) => {
            // Check if this module is in completedModules
            const isCompleted = storedData.completedModules?.includes(index) || false;
            
            // Create a module object matching the expected format
            return {
              id: `${index + 1}`,
              title: `Module ${index + 1}`,
              duration: 1, // Default duration
              progress: isCompleted ? 100 : competence
            };
          });
          setLocalModules(localModuleData);
        }
      }
      
      // Also check sessionStorage for the most recent progress
      try {
        const sessionData = sessionStorage.getItem(`${course.id}_progress`);
        if (sessionData) {
          const parsedData = JSON.parse(sessionData);
          if (parsedData.modules && Array.isArray(parsedData.modules)) {
            const sessionModules = parsedData.modules.map((module: any, index: number) => ({
              id: module.moduleId || `${index + 1}`,
              title: `Module ${index + 1}`,
              duration: 1,
              progress: module.percentComplete || 0
            }));
            
            // Use session data if it's available (more recent than localStorage)
            setLocalModules(sessionModules);
            setIsLocalProgressAvailable(true);
          }
        }
      } catch (e) {
        console.error("Error reading from sessionStorage:", e);
      }
    };
    
    checkLocalProgress();
  }, [course.id]);
  
  // Force refresh when progress data changes
  useEffect(() => {
    if (progress?.lastActivity) {
      try {
        const activityDate = new Date(progress.lastActivity);
        setLastUpdated(activityDate);
      } catch (e) {
        console.error("Error parsing activity date:", e);
      }
    }
  }, [progress]);
  
  // Set up an interval to check for updated progress in sessionStorage
  useEffect(() => {
    const checkForUpdates = () => {
      try {
        const storedProgress = sessionStorage.getItem(`${course.id}_progress`);
        if (storedProgress) {
          const parsedProgress = JSON.parse(storedProgress);
          
          // Update the modules list if there's new data
          if (parsedProgress.modules && Array.isArray(parsedProgress.modules)) {
            const sessionModules = parsedProgress.modules.map((module: any, index: number) => ({
              id: module.moduleId || `${index + 1}`,
              title: `Module ${index + 1}`,
              duration: 1,
              progress: module.percentComplete || 0
            }));
            
            setLocalModules(sessionModules);
            setIsLocalProgressAvailable(true);
            
            if (parsedProgress.lastActivity && progress?.lastActivity) {
              // Check if stored progress is newer than current progress
              const storedDate = new Date(parsedProgress.lastActivity);
              const currentDate = new Date(progress.lastActivity);
              if (storedDate > currentDate) {
                setLastUpdated(storedDate); // Force refresh
              }
            }
          }
        }
      } catch (e) {
        console.error("Error checking for progress updates:", e);
      }
    };
    
    // Initial check
    checkForUpdates();
    
    // Check for updates every 5 seconds
    const intervalId = setInterval(checkForUpdates, 5000);
    
    return () => clearInterval(intervalId);
  }, [course.id, progress]);
  
  if (isLoading && !isLocalProgressAvailable) {
    return (
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>
        <div className="h-32 bg-slate-200 rounded"></div>
        <div className="h-64 bg-slate-200 rounded"></div>
      </div>
    );
  }
  
  // Use progress data or default to 0
  const percentComplete = progress?.percentComplete || course.progress || 0;
  const timeSpent = progress?.timeSpent || 0;
  const lastActivity = progress?.lastActivity || 'N/A';
  
  // Determine which modules to display
  // First try the modules from course details via API
  let modules = courseDetails?.modules || [];
  const completedModules = courseDetails?.completedModules || 0;
  const totalModules = courseDetails?.totalModules || modules.length;
  
  // If we have local modules with progress data, use that instead as it's more up-to-date
  if (isLocalProgressAvailable && localModules.length > 0) {
    // Merge the module titles from API with progress from local storage
    if (modules.length > 0 && modules.length === localModules.length) {
      // We have both API modules and local progress, merge them
      modules = modules.map((module, index) => ({
        ...module,
        progress: localModules[index].progress
      }));
    } else if (localModules.length > 0) {
      // Only have local modules, use those
      modules = localModules.map((module, index) => ({
        id: `${index + 1}`,
        title: courseDetails?.modules[index]?.title || `Module ${index + 1}`,
        duration: courseDetails?.modules[index]?.duration || 1,
        progress: module.progress
      }));
    }
  }
  
  return (
    <div className="p-6">
      <ProgressSummary
        percentComplete={percentComplete}
        completedModules={completedModules}
        totalModules={totalModules}
        timeSpent={timeSpent}
        lastActivity={lastActivity}
      />
      
      <ModulesList
        modules={modules}
        courseId={course.id}
      />
    </div>
  );
};

export default CourseDetails;
