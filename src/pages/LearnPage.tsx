import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useCourseData } from '@/hooks/courseData';
import { useModuleProgress } from '@/hooks/useModuleProgress';
import { useModuleNavigation } from '@/hooks/useModuleNavigation';
import LearnPageContent from '@/components/learn/LearnPageContent';
import { Toaster } from '@/components/ui/toaster';
import { MODULE_COMPETENCE } from '@/components/learn/CompetenceIndicator';
import { getTotalModulesForCourse } from '@/hooks/courseData/courseProgressUtils';

const LearnPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseId') || 'course1'; // Default to COPC Basic Course
  
  // Use course data for current course
  const { course, courseDetails, progress, setProgress } = useCourseData(courseId);
  
  // Use the module progress hook
  const { 
    correctAnswers,
    questionResponses,
    correctAttempts,
    moduleCompetence,
    competenceLevel,
    completedModules,
    showCompetenceLevel,
    handleSaveAnswer,
    handleModuleComplete,
    recalculateModuleCompetence,
    resetProgress,
    isInitialized
  } = useModuleProgress(courseId);

  // Use the module navigation hook
  const {
    currentModuleIndex,
    isFirstModule,
    isLastModule,
    selectedAnswer,
    setSelectedAnswer,
    handlePrevious,
    handleNext,
    handleModuleSelect,
    totalModules
  } = useModuleNavigation(courseId);

  // Create moduleProgress object
  const moduleProgress = {
    moduleCompetence,
    correctAttempts,
    competenceLevel,
    showCompetenceLevel, 
    questionResponses,
    completedModules
  };

  // Wrap handleSaveAnswer for correct tracking
  const wrappedSaveAnswer = useCallback((isCorrect: boolean, moduleIndex: number, questionIndex: number = 0) => {
    // Ensure MODULE_COMPETENCE is synced
    if (moduleCompetence && moduleCompetence.length > 0) {
      moduleCompetence.forEach((value, index) => {
        if (value > 0) {
          MODULE_COMPETENCE.setValue(index, value);
        }
      });
    }
    
    // Call original handler
    handleSaveAnswer(isCorrect, moduleIndex, questionIndex);
  }, [handleSaveAnswer, moduleCompetence]);

  // Force update progress for sync
  const forceUpdateProgress = useCallback(async () => {
    if (recalculateModuleCompetence) {
      recalculateModuleCompetence();
      return Promise.resolve();
    }
    return Promise.resolve();
  }, [recalculateModuleCompetence]);

  return (
    <>
      <LearnPageContent
        courseId={courseId}
        course={course}
        progress={progress}
        setProgress={setProgress}
        currentModuleIndex={currentModuleIndex}
        isFirstModule={isFirstModule}
        isLastModule={isLastModule}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        moduleProgress={moduleProgress}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleModuleSelect={handleModuleSelect}
        handleSaveAnswer={wrappedSaveAnswer}
        handleModuleComplete={handleModuleComplete}
        forceUpdateProgress={forceUpdateProgress}
        getTotalModulesForCourse={getTotalModulesForCourse}
        initializationComplete={isInitialized}
      />
      <Toaster />
    </>
  );
};

export default LearnPage;