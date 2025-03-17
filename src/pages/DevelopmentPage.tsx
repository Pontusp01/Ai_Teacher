
import React from 'react';
import { useDevelopmentData } from '@/hooks/useDevelopmentData';
import CoursesList from '@/components/development/CoursesList';
import LearningMaterials from '@/components/development/LearningMaterials';
import CourseDetails from '@/components/development/CourseDetails';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const DevelopmentPage: React.FC = () => {
  const { courses, documents, isLoading } = useDevelopmentData();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Development</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CoursesList courses={courses} isLoading={isLoading} />
          <LearningMaterials documents={documents} isLoading={isLoading} />
        </div>
        
        <div className="md:col-span-2">
          <Accordion type="single" collapsible className="space-y-4">
            {courses.map((course) => (
              <AccordionItem 
                key={course.id} 
                value={course.id}
                className="border rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <h3 className="text-xl font-semibold text-left">{course.title}</h3>
                </AccordionTrigger>
                <AccordionContent className="px-0">
                  <CourseDetails course={course} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPage;
