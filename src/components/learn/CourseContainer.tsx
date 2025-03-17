import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { CourseProgress } from '@/shared/types';
import LearnSidebar from '@/components/learn/LearnSidebar';
import CourseContent from '@/components/learn/CourseContent';
import ProgressNavigation from '@/components/learn/ProgressNavigation';
import { QuestionResponse } from '@/hooks/useModuleProgress';
import { MODULE_COMPETENCE } from './CompetenceIndicator';

interface CourseContainerProps {
  course: any;
  courseId: string;
  progress: CourseProgress | null;
  currentModuleIndex: number | null;
  isFirstModule: boolean;
  isLastModule: boolean;
  selectedAnswer: string;
  setSelectedAnswer: (value: string) => void;
  moduleCompetence: number[];
  correctAttempts: number[];
  competenceLevel: number;
  showCompetenceLevel: boolean;
  questionResponses: {[moduleIndex: number]: QuestionResponse[]};
  handlePrevious: () => void;
  handleNext: () => void;
  handleModuleSelect: (index: number) => void;
  onSaveAnswer: (isCorrect: boolean, questionIndex?: number) => void;
  onModuleComplete: (moduleIndex: number) => void;
  [key: string]: any;
}

const CourseContainer: React.FC<CourseContainerProps> = ({
  course,
  courseId,
  progress,
  currentModuleIndex,
  isFirstModule,
  isLastModule,
  selectedAnswer,
  setSelectedAnswer,
  moduleCompetence,
  correctAttempts,
  competenceLevel,
  showCompetenceLevel,
  questionResponses,
  handlePrevious,
  handleNext,
  handleModuleSelect,
  onSaveAnswer,
  onModuleComplete
}) => {
  // State för att trigga omrendering
  const [updateCounter, setUpdateCounter] = useState(0);
  
  // Initiera MODULE_COMPETENCE med värden från moduleCompetence
  useEffect(() => {
    if (moduleCompetence && moduleCompetence.length > 0) {
      let hasChanges = false;
      
      // Uppdatera MODULE_COMPETENCE för varje modul
      moduleCompetence.forEach((value, index) => {
        if (MODULE_COMPETENCE.getValue(index) !== value) {
          MODULE_COMPETENCE.setValue(index, value);
          hasChanges = true;
        }
      });
      
      // Om det finns ändringar, tvinga omrendering
      if (hasChanges) {
        setUpdateCounter(prev => prev + 1);
      }
    }
  }, [moduleCompetence]);
  
  // Enkel wrapper för onSaveAnswer
  const handleSaveAnswer = (isCorrect: boolean, questionIndex: number = 0) => {
    // Anropa original onSaveAnswer
    onSaveAnswer(isCorrect, questionIndex);
    
    // Tvinga omrendering för att visa uppdaterad kompetens
    setUpdateCounter(prev => prev + 1);
  };
  
  // Starta kursen
  const handleStartCourse = () => {
    handleModuleSelect(0);
  };
  
  // Props för sidebar
  const sidebarProps = {
    course, 
    courseId, 
    currentModuleIndex,
    onModuleSelect: handleModuleSelect,
    // Ej behov av att skicka moduleCompetence eftersom vi använder MODULE_COMPETENCE
  };
  
  // Props för course content
  const contentProps = {
    course, 
    courseId, 
    selectedAnswer, 
    setSelectedAnswer, 
    currentModuleIndex: currentModuleIndex !== null ? currentModuleIndex : 0,
    onSaveAnswer: handleSaveAnswer,
    isLastModule,
    moduleCompetence,
    questionResponses: currentModuleIndex !== null ? (questionResponses[currentModuleIndex] || []) : []
  };
  
  // Props för navigation
  const navigationProps = {
    courseId,
    progress,
    currentModuleIndex: currentModuleIndex !== null ? currentModuleIndex : 0,
    handlePrevious, 
    handleNext,
    isFirstModule,
    isLastModule,
    showCompetenceLevel,
    competenceLevel
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <LearnSidebar moduleCompetence={[]} {...sidebarProps} />
        </div>

        <div className="md:col-span-2">
          {currentModuleIndex !== null ? (
            <>
              <CourseContent 
                {...contentProps}
                onModuleComplete={onModuleComplete}
              />
              
              <ProgressNavigation {...navigationProps} />
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">
                {course ? `Welcome to ${course.title}` : 'Welcome to the Course'}
              </h2>
              <p className="text-gray-700 mb-6">
                Ready to start your learning journey? Click the button below to begin with the first module.
              </p>
              <Button 
                onClick={handleStartCourse}
                className="px-6 py-2 flex items-center justify-center gap-2 mx-auto"
                size="lg"
              >
                Begin Course
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContainer;