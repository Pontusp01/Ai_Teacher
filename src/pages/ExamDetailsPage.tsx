
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExamDetails, getQuestions, submitAnswer } from '@/shared/api';
import { Question, ExamDetails, AnswerSubmission } from '@/shared/types';
import QuestionCard from '@/components/exams/QuestionCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const ExamDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [exam, setExam] = useState<ExamDetails | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    const fetchExamDetails = async () => {
      if (!id) {
        setError('No exam ID specified');
        setIsLoading(false);
        return;
      }
      
      try {
        const examData = await getExamDetails(id);
        setExam(examData);
        
        // For demo purposes, we'll fetch questions separately
        const questionsData = await getQuestions() as Question[];
        // Take first 2 questions for the demo
        setQuestions(questionsData.slice(0, 2));
      } catch (error) {
        console.error('Error fetching exam details:', error);
        setError('An error occurred while fetching the exam.');
        toast({
          title: 'Error fetching exam',
          description: 'An error occurred while fetching the exam.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExamDetails();
  }, [id, toast]);
  
  const handleSubmitAnswer = async (questionId: string, answer: string) => {
    const submission: AnswerSubmission = {
      questionId,
      answer,
    };
    
    return submitAnswer(submission);
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // This would submit the new question in a real application
    setInputValue('');
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex justify-center p-8">
          <div className="animate-pulse flex space-x-4">
            <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !exam) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 flex items-start">
          <AlertTriangle className="text-red-500 w-6 h-6 mr-3 mt-0.5" />
          <div>
            <h2 className="text-lg font-medium text-red-800 mb-2">An error occurred</h2>
            <p className="text-red-700">{error || 'The exam could not be found.'}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/exams')}
            >
              Back to exams
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4"
          onClick={() => navigate('/exams')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">COPC Exam</h1>
          <div className="bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full">
            Based on COPC Standard 7.0
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <p className="text-blue-800">
          Ask questions or make statements to test your COPC knowledge.
          You'll get immediate feedback with references to relevant material.
        </p>
      </div>
      
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
            <p className="mb-4">{question.text}</p>
            
            {index === 0 && (
              <div className="bg-green-100 p-4 rounded-md mb-4">
                <h3 className="text-green-800 font-medium mb-1">Correct knowledge!</h3>
                <p>According to the COPC standard, the minimum requirement for FCR (First Contact Resolution) is 75%.</p>
                <p className="text-sm text-green-600 mt-1">Source: COPC CX Standard 7.0, Section 4.2.3, page 237</p>
              </div>
            )}
            
            {index === 1 && (
              <div className="bg-red-50 p-4 rounded-md mb-4">
                <h3 className="text-red-700 font-medium mb-1">Partially incorrect</h3>
                <p>The COPC standard requires that customer satisfaction (CSAT) be at least 85%, not 90%.</p>
                <p className="text-sm text-red-600 mt-1">Source: COPC CX Standard 7.0, Section 4.1.2, page 215</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmitQuestion} className="mt-8">
        <div className="flex">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question or make a statement about COPC..."
            className="flex-grow rounded-r-none"
          />
          <Button type="submit" className="rounded-l-none bg-blue-700">
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Button>
        </div>
      </form>
      
      <div className="mt-8 bg-amber-50 p-4 rounded-lg flex justify-between items-center">
        <div className="text-amber-800">
          <p>Current learning topic: KPI understanding for COPC certification</p>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">COPC KPI understanding:</span>
          <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: '80%' }}
            ></div>
          </div>
          <span className="ml-2">80%</span>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailsPage;
