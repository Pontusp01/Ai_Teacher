import React, { useCallback, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MODULE_COMPETENCE, getCompetenceColor } from './CompetenceIndicator';

interface QuestionOption {
  id: string;
  text: string;
}

interface QuestionData {
  question: string;
  options: QuestionOption[];
  correctOption: string;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

interface QuestionCardProps {
  currentQuestion: QuestionData;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string;
  setSelectedAnswer: (value: string) => void;
  showFeedback: boolean;
  handleSubmitAnswer: () => void;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isAnswered?: boolean;
  onUpdateCompetence?: (isCorrect: boolean) => void;
  moduleIndex: number;
  [key: string]: any;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  handleSubmitAnswer,
  handleNextQuestion,
  handlePreviousQuestion,
  isFirstQuestion,
  isLastQuestion,
  onUpdateCompetence,
  moduleIndex
}) => {
  // Lokal state för kompetensändring
  const [competenceChange, setCompetenceChange] = useState<number>(0);
  
  // Spara-knappen ska bara vara inaktiverad om inget svar är valt
  const isSaveButtonDisabled = !selectedAnswer;
  
  // Hämta aktuell kompetens och färg
  const competenceValue = MODULE_COMPETENCE.getValue(moduleIndex);
  const competenceColorClass = getCompetenceColor(moduleIndex);
  
  // Hantera svarsval
  const onSelectedAnswerChange = useCallback((value: string) => {
    setSelectedAnswer(value);
  }, [setSelectedAnswer]);

  // Hantera inlämning av svar
  const handleAnswerSubmit = useCallback(() => {
    if (!selectedAnswer || !currentQuestion) return;
    
    // Kontrollera om svaret är rätt
    const isCorrect = selectedAnswer === currentQuestion.correctOption;
    
    // Spara nuvarande kompetens för att visa förändring
    const oldValue = MODULE_COMPETENCE.getValue(moduleIndex);
    
    // Uppdatera kompetens - exakt +5% eller -5%
    const newValue = MODULE_COMPETENCE.updateValue(moduleIndex, isCorrect);
    
    // Beräkna förändringen för feedback
    const change = newValue - oldValue;
    setCompetenceChange(change);
    
    // Anropa callbacks
    handleSubmitAnswer();
    if (onUpdateCompetence) {
      onUpdateCompetence(isCorrect);
    }
  }, [
    selectedAnswer,
    currentQuestion,
    handleSubmitAnswer,
    onUpdateCompetence,
    moduleIndex
  ]);
  
  // Om det inte finns någon fråga, visa meddelande
  if (!currentQuestion || !currentQuestion.options) {
    return (
      <div className="bg-blue-50 rounded-md p-4 mb-6">
        <p>No question data available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-md p-4 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-medium">Knowledge Check</h2>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          
          {/* Kompetensvisning */}
          <div className={`px-2 py-0.5 rounded-full text-xs ${competenceColorClass}`}>
            {competenceValue}%
          </div>
        </div>
      </div>
      
      <p className="mb-4">{currentQuestion.question}</p>
      
      <RadioGroup value={selectedAnswer} onValueChange={onSelectedAnswerChange} className="space-y-3 mb-4">
        {currentQuestion.options.map(option => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id}>{option.text}</Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="flex justify-between mt-4">
        <Button 
          onClick={handlePreviousQuestion}
          variant="outline"
          disabled={isFirstQuestion}
        >
          Previous Question
        </Button>
        
        {!showFeedback ? (
          <Button 
            onClick={handleAnswerSubmit}
            disabled={isSaveButtonDisabled}
          >
            Save Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNextQuestion}
            disabled={isLastQuestion}
          >
            Next Question
          </Button>
        )}
      </div>
      
      {showFeedback && (
        <div className={`mt-4 p-3 rounded ${selectedAnswer === currentQuestion.correctOption ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {selectedAnswer === currentQuestion.correctOption 
            ? currentQuestion.feedback.correct
            : currentQuestion.feedback.incorrect}
          
          <div className="mt-2 flex items-center gap-2">
            <div className={`h-2 w-16 rounded-full ${competenceColorClass}`}></div>
            <span className="text-sm font-medium">
              Competence: {competenceValue}%
              {competenceChange !== 0 && 
                ` (${competenceChange > 0 ? '+' : ''}${competenceChange}%)`
              }
            </span>
          </div>
          
          {isLastQuestion && (
            <div className="mt-2 font-medium">
              Module completed! You can now proceed to the next module.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;