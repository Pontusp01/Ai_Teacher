
import React, { useState, useRef } from 'react';
import { Question, AnswerResponse } from '@/shared/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onSubmit: (answer: string) => Promise<AnswerResponse>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [response, setResponse] = useState<AnswerResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitInProgressRef = useRef(false); // Add a ref to track if a submission is in progress
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Multiple guard clauses to prevent duplicate submissions
    if (!answer) return;  
    if (isSubmitting) return;
    if (response) return;
    if (submitInProgressRef.current) return; // Extra protection with the ref
    
    // Set both state and ref to prevent multiple clicks from triggering submissions
    setIsSubmitting(true);
    submitInProgressRef.current = true;
    
    try {
      const result = await onSubmit(answer);
      setResponse(result);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      // Add a delay before allowing new submissions to prevent double-clicks
      setTimeout(() => {
        setIsSubmitting(false);
        submitInProgressRef.current = false;
      }, 1500); // Longer delay for better protection
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-md shadow-sm mb-6">
      <h3 className="text-lg font-medium bg-green-50 p-4 rounded-md mb-4">{question.text}</h3>
      
      <form onSubmit={handleSubmit}>
        {question.type === 'multiple-choice' && question.options && (
          <RadioGroup value={answer} onValueChange={setAnswer} className="space-y-2">
            {question.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${option}`} disabled={isSubmitting || !!response} />
                <Label htmlFor={`option-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {question.type === 'text' && (
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Skriv ditt svar här..."
            className="w-full mb-4"
            disabled={isSubmitting || !!response}
          />
        )}
        
        <Button 
          type="submit" 
          className="mt-4" 
          disabled={isSubmitting || !answer || !!response}
        >
          Skicka svar
        </Button>
      </form>
      
      {response && (
        <div className={`mt-6 p-4 rounded-md ${response.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-start">
            {response.isCorrect ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            )}
            <div>
              <p className={`font-medium ${response.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {response.isCorrect ? 'Korrekt kunskap!' : 'Delvis inkorrekt'}
              </p>
              <p className="mt-1">{response.feedback}</p>
              {response.reference && (
                <p className="text-sm text-gray-600 mt-2">{response.reference}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
