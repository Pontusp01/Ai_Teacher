
import React from 'react';
import { Exam } from '@/shared/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, FilesIcon, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExamCardProps {
  exam: Exam;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate(`/exams/${exam.id}`);
  };
  
  const handleEdit = () => {
    navigate(`/exams/${exam.id}/edit`);
  };
  
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className={exam.title.includes('COPC') ? 'bg-red-50' : 'bg-green-50'}>
        <CardTitle className="text-lg font-medium text-gray-800">{exam.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FilesIcon className="h-4 w-4 mr-1" />
          <span>Baserat på: {exam.baseDocument}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>Skapad: {exam.createdDate}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit2 className="h-4 w-4 mr-1" />
          Redigera
        </Button>
        <Button size="sm" onClick={handleStart}>Starta</Button>
      </CardFooter>
    </Card>
  );
};

export default ExamCard;
