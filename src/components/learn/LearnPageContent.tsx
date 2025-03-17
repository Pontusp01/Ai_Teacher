import React, { useCallback, useRef, useState } from 'react';
import { Course, CourseProgress } from '@/shared/types';
import CourseContainer from '@/components/learn/CourseContainer';
import { QuestionResponse } from '@/hooks/useModuleProgress';
import { useProgressSync } from '@/hooks/useProgressSync';
import { useProgressUpdater } from '@/hooks/useProgressUpdater';
import { useModuleChangeDetector } from '@/hooks/useModuleChangeDetector';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clearProgressFromStorage } from '@/hooks/moduleProgress/storageUtils';
import { useToast } from '@/hooks/use-toast';
import { resetCourseProgress } from '@/hooks/moduleProgress/competenceUtils';

interface LearnPageContentProps {
  courseId: string;
  course: Course | null;
  progress: CourseProgress | null;
  setProgress: ((updatedProgress: CourseProgress) => void) | undefined;
  currentModuleIndex: number | null;
  isFirstModule: boolean;
  isLastModule: boolean;
  selectedAnswer: string;
  setSelectedAnswer: (value: string) => void;
  moduleProgress: {
    moduleCompetence: number[];
    correctAttempts: number[];
    competenceLevel: number;
    showCompetenceLevel: boolean;
    questionResponses: {[moduleIndex: number]: QuestionResponse[]};
    completedModules: number[];
  };
  handlePrevious: () => void;
  handleNext: () => void;
  handleModuleSelect: (index: number) => void;
  handleSaveAnswer: (isCorrect: boolean, moduleIndex: number, questionIndex?: number) => void;
  handleModuleComplete: (moduleIndex: number) => void;
  forceUpdateProgress: (() => Promise<void>) | undefined;
  getTotalModulesForCourse: (courseId: string) => number;
  initializationComplete: boolean;
}

const LearnPageContent: React.FC<LearnPageContentProps> = ({
  courseId,
  course,
  progress,
  setProgress,
  currentModuleIndex,
  isFirstModule,
  isLastModule,
  selectedAnswer,
  setSelectedAnswer,
  moduleProgress,
  handlePrevious,
  handleNext,
  handleModuleSelect,
  handleSaveAnswer,
  handleModuleComplete,
  forceUpdateProgress,
  getTotalModulesForCourse,
  initializationComplete
}) => {
  // Initial update flag
  const initialUpdateDoneRef = useRef(false);
  const [isResetting, setIsResetting] = useState(false);
  const { toast } = useToast();
  
  // Use our hooks
  useProgressSync(forceUpdateProgress);
  useProgressUpdater(courseId, progress, setProgress, moduleProgress, getTotalModulesForCourse);
  useModuleChangeDetector(currentModuleIndex, forceUpdateProgress);
  
  // Force update once at mount
  React.useEffect(() => {
    if (!initialUpdateDoneRef.current && forceUpdateProgress && initializationComplete) {
      initialUpdateDoneRef.current = true;
      const timer = setTimeout(() => {
        console.log("Initial progress update on mount");
        if (forceUpdateProgress) forceUpdateProgress();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [forceUpdateProgress, initializationComplete]);
  
  // Handle saving answers with proper protection
  const onSaveAnswer = useCallback((isCorrect: boolean, questionIndex: number = 0) => {
    if (currentModuleIndex !== null) {
      handleSaveAnswer(isCorrect, currentModuleIndex, questionIndex);
    }
  }, [currentModuleIndex, handleSaveAnswer]);

  // Handle course reset
  const handleResetCourse = useCallback(() => {
    if (isResetting) return;
    
    setIsResetting(true);
    
    // Clear localStorage
    clearProgressFromStorage(courseId);
    
    // Show toast notification
    toast({
      title: "Course Reset",
      description: "Your course progress has been reset. Reloading page...",
      duration: 3000
    });
    
    // Add a small delay to show the toast before reloading
    setTimeout(() => {
      // Reload the page to reset all state
      window.location.reload();
    }, 1500);
  }, [courseId, isResetting, toast]);

  // Använd typkonvertering för att undvika TypeScript-fel
  const courseContainerProps = {
    course,
    courseId,
    progress,
    currentModuleIndex,
    isFirstModule,
    isLastModule,
    selectedAnswer,
    setSelectedAnswer,
    moduleCompetence: moduleProgress.moduleCompetence,
    correctAttempts: moduleProgress.correctAttempts,
    competenceLevel: moduleProgress.competenceLevel,
    showCompetenceLevel: moduleProgress.showCompetenceLevel,
    questionResponses: moduleProgress.questionResponses,
    handlePrevious,
    handleNext,
    handleModuleSelect,
    onSaveAnswer,
    handleModuleComplete
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-end items-center p-4 bg-gray-50 border-b sticky top-0 z-10">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleResetCourse}
          disabled={isResetting}
          className="flex items-center gap-1"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          Reset Course
        </Button>
      </div>
      <div className="flex-grow">
        <CourseContainer 
          {...courseContainerProps as any}
        />
      </div>
    </div>
  );
};

export default LearnPageContent;