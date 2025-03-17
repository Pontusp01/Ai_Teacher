import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Course } from '@/shared/types';
import QuestionCard from './QuestionCard';
import ModuleContent from './ModuleContent';
import { getQuestionsForModule } from './courseQuestionsData';
import { getCourseTitle, getModuleTitle } from './moduleUtils';
import { MODULE_COMPETENCE } from './CompetenceIndicator';

interface CourseContentProps {
  course: Course | null;
  courseId: string;
  selectedAnswer: string;
  setSelectedAnswer: (value: string) => void;
  currentModuleIndex: number;
  onSaveAnswer: (isCorrect: boolean, questionIndex?: number) => void;
  isLastModule: boolean;
  moduleCompetence?: number[]; 
  questionResponses?: {isCorrect: boolean, attempts: number}[];
  onModuleComplete?: (moduleIndex: number) => void;
}

const CourseContent: React.FC<CourseContentProps> = ({ 
  course, 
  courseId, 
  selectedAnswer, 
  setSelectedAnswer,
  currentModuleIndex,
  onSaveAnswer,
  isLastModule,
  moduleCompetence = [],
  questionResponses = [],
  onModuleComplete
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const moduleRef = useRef<number>(currentModuleIndex);
  const isModuleChangingRef = useRef(false);
  const isProcessingAnswerRef = useRef(false);
  
  const questions = getQuestionsForModule(courseId, currentModuleIndex);
  const currentQuestion = questions[currentQuestionIndex];
  const moduleTitle = getModuleTitle(courseId, currentModuleIndex);
  const courseTitle = getCourseTitle(course);

  // Initiera modulens värde från moduleCompetence, om det finns
  useEffect(() => {
    if (moduleCompetence && moduleCompetence.length > currentModuleIndex) {
      const currentValue = moduleCompetence[currentModuleIndex] || 0;
      if (MODULE_COMPETENCE.getValue(currentModuleIndex) !== currentValue) {
        MODULE_COMPETENCE.setValue(currentModuleIndex, currentValue);
      }
    }
  }, [currentModuleIndex, moduleCompetence]);

  // Hantera modulbyten
  useEffect(() => {
    if (moduleRef.current !== currentModuleIndex) {
      isModuleChangingRef.current = true;
      moduleRef.current = currentModuleIndex;
      
      // Återställ state
      setShowFeedback(false);
      setCurrentQuestionIndex(0);
      setSelectedAnswer('');
      isProcessingAnswerRef.current = false;
      
      setTimeout(() => {
        isModuleChangingRef.current = false;
      }, 100);
    }
  }, [currentModuleIndex, setSelectedAnswer]);

  // Initiera besvarade frågor
  useEffect(() => {
    if (isModuleChangingRef.current) return;
    
    const answered = new Array(questions.length).fill(false);
    
    questionResponses.forEach((response, index) => {
      if (index < answered.length) {
        answered[index] = true;
      }
    });
    
    setAnsweredQuestions(answered);
    
    // Kontrollera om alla frågor besvarats korrekt
    const allAnsweredCorrectly = questionResponses.length === questions.length && 
      questionResponses.every(response => response.isCorrect);
    
    if (allAnsweredCorrectly && onModuleComplete && !isModuleChangingRef.current) {
      const timer = setTimeout(() => {
        if (!isModuleChangingRef.current) {
          onModuleComplete(currentModuleIndex);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [questionResponses, questions.length, currentModuleIndex, onModuleComplete]);

  // Kontrollera om aktuell fråga har besvarats
  const isCurrentQuestionAnswered = useCallback(() => {
    return answeredQuestions[currentQuestionIndex] || false;
  }, [answeredQuestions, currentQuestionIndex]);

  // Hantera kompetensuppdateringar
  const handleUpdateCompetence = useCallback((isCorrect: boolean) => {
    // Anropa parent callback med resultat
    onSaveAnswer(isCorrect, currentQuestionIndex);
  }, [currentQuestionIndex, onSaveAnswer]);

  // Hantera svarsinlämning
  const handleSubmitAnswer = useCallback(() => {
    if (isModuleChangingRef.current) return; 
    if (isProcessingAnswerRef.current) return;
    if (!selectedAnswer) return;
    if (showFeedback) return;
    
    isProcessingAnswerRef.current = true;
    setShowFeedback(true);
    
    setAnsweredQuestions(prev => {
      const newAnsweredQuestions = [...prev];
      newAnsweredQuestions[currentQuestionIndex] = true;
      return newAnsweredQuestions;
    });
    
    setTimeout(() => {
      isProcessingAnswerRef.current = false;
    }, 1000);
  }, [currentQuestionIndex, selectedAnswer, showFeedback]);
  
  // Navigera till nästa fråga
  const handleNextQuestion = useCallback(() => {
    if (isModuleChangingRef.current || isProcessingAnswerRef.current) return;
    
    isProcessingAnswerRef.current = true;
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    }
    
    setTimeout(() => {
      isProcessingAnswerRef.current = false;
    }, 300);
  }, [currentQuestionIndex, questions.length, setSelectedAnswer]);
  
  // Navigera till föregående fråga
  const handlePreviousQuestion = useCallback(() => {
    if (isModuleChangingRef.current || isProcessingAnswerRef.current) return;
    
    isProcessingAnswerRef.current = true;
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    }
    
    setTimeout(() => {
      isProcessingAnswerRef.current = false;
    }, 300);
  }, [currentQuestionIndex, setSelectedAnswer]);

  if (!course) return <div>Loading...</div>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2">{courseTitle}: {moduleTitle}</h1>
      
      <div className="bg-green-100 text-green-800 rounded p-2 mb-4">
        Adapted to your learning style: Visual + Practical
      </div>
      
      <ModuleContent 
        courseId={courseId} 
        currentModuleIndex={currentModuleIndex}
        courseTitle={courseTitle}
        moduleTitle={moduleTitle}
      />
      
      <QuestionCard
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        showFeedback={showFeedback}
        handleSubmitAnswer={handleSubmitAnswer}
        handleNextQuestion={handleNextQuestion}
        handlePreviousQuestion={handlePreviousQuestion}
        isFirstQuestion={currentQuestionIndex === 0}
        isLastQuestion={currentQuestionIndex >= questions.length - 1}
        isAnswered={isCurrentQuestionAnswered()}
        onUpdateCompetence={handleUpdateCompetence}
        moduleIndex={currentModuleIndex}
      />
    </>
  );
};

export default CourseContent;