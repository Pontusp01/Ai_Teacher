
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, ChevronRight } from 'lucide-react';

const AIAssistantPage = () => {
  const [input, setInput] = useState('');
  
  // Mock conversation data
  const conversations = [
    { 
      id: '1',
      question: 'Explain how FCR is measured according to COPC',
      answer: 'According to the COPC standard, FCR (First Contact Resolution) is measured in two ways:\n\n1. Internal measurement: By tracking if the customer returns with the same issue within 5-7 days\n\n2. External measurement: By asking the customer after contact if their problem was resolved on the first attempt',
      timestamp: 'Today 10:15'
    },
    {
      id: '2',
      question: 'What are the most important KPIs for a COPC-certified contact center?',
      answer: 'The most important KPIs in a COPC-certified contact center are:\n\n1. Service Level (SL): 80% of calls answered within 20 seconds\n\n2. First Contact Resolution (FCR): At least 75% resolved on first contact\n\n3. Customer Satisfaction (CSAT): At least 85% satisfied customers\n\n4. Quality Score: At least 90% on quality evaluations\n\n5. Efficiency Metrics: Customized AHT goals based on interaction complexity',
      timestamp: 'Today 10:18'
    },
    {
      id: '3',
      question: 'In the process I am studying, how should I improve Process-KPIs?',
      answer: 'Based on your current chapter (3.4 Process-KPIs), I recommend you continue to the next section 3.5 on Process Improvement. There you will learn COPC\'s methodology for identifying and implementing process improvements that directly impact your KPIs.',
      timestamp: 'Today 10:20'
    }
  ];
  
  const suggestedQuestions = [
    "What is the minimum requirement for FCR according to COPC?",
    "How does COPC define customer satisfaction?",
    "Which process metrics are most important according to COPC?",
    "How is quality measurement implemented in COPC?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // In a real app, this would send the input to an API
      setInput('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="bg-blue-50 p-4 rounded-md mb-4">
        <h1 className="text-xl font-semibold">COPC AI Coach: Personalized help based on your learning</h1>
        <p className="text-sm text-gray-600">Current module: 3.4 Process-KPIs</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg shadow">
          <ScrollArea className="h-[calc(100vh-280px)] p-4">
            {conversations.map((conv) => (
              <div key={conv.id} className="mb-6">
                <div className="bg-green-50 p-3 rounded-md mb-2">
                  <p className="text-green-800">{conv.question}</p>
                </div>
                
                <div className="bg-blue-600 text-white p-4 rounded-md">
                  <p className="whitespace-pre-line">{conv.answer}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
          
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question or make a statement about COPC..."
                className="flex-grow rounded-r-none"
              />
              <Button type="submit" className="rounded-l-none" disabled={!input.trim()}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex flex-col gap-3">
            {suggestedQuestions.map((question, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="justify-start h-auto bg-green-50 hover:bg-green-100 border-green-100 text-left py-3"
                onClick={() => setInput(question)}
              >
                {question}
              </Button>
            ))}
          </div>
          
          <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-100">
            <p className="text-sm text-amber-800">
              Current learning topic: KPI understanding for COPC certification
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600 mr-2">COPC KPI understanding:</span>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: '80%' }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">80%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
