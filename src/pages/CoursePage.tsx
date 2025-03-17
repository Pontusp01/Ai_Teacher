
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseDetails, getCourseProgress } from '@/shared/api';
import { CourseDetails, CourseProgress } from '@/shared/types';
import CourseProgressCard from '@/components/courses/CourseProgressCard';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!id) {
        setError('No course ID specified');
        setIsLoading(false);
        return;
      }
      
      try {
        const [courseData, progressData] = await Promise.all([
          getCourseDetails(id),
          getCourseProgress(id)
        ]);
        
        setCourse(courseData);
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('An error occurred while fetching course information.');
        toast({
          title: 'Error fetching course',
          description: 'An error occurred while fetching course information.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourseData();
  }, [id, toast]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
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
  
  if (error || !course) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 flex items-start">
          <AlertTriangle className="text-red-500 w-6 h-6 mr-3 mt-0.5" />
          <div>
            <h2 className="text-lg font-medium text-red-800 mb-2">An error occurred</h2>
            <p className="text-red-700">{error || 'The course could not be found.'}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-700 mb-6">{course.description}</p>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4">Modules</h2>
            
            <div className="space-y-6">
              {course.modules.map((module, index) => (
                <div 
                  key={module.id} 
                  className="p-4 rounded-lg border"
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: module.progress === 100 
                      ? '#4ade80' 
                      : module.progress > 0 
                        ? '#facc15' 
                        : '#e5e7eb'
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">
                      {index + 1}. {module.title}
                    </h3>
                    <span className="text-sm text-gray-600">{module.duration} hours</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{module.progress}% completed</span>
                    {module.progress === 100 && <span>Completed</span>}
                    {module.progress > 0 && module.progress < 100 && <span>In progress</span>}
                    {module.progress === 0 && <span>Not started</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {course.progress > 0 && course.progress < 100 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h2 className="font-medium text-blue-700 mb-2">AI suggests: Continue with your learning</h2>
              <p className="text-blue-600 text-sm">
                Based on your current chapter (3.4 Process-KPIs), I recommend that you continue to
                the next section 3.5 on Process Improvement. There you will learn COPC's methodology for
                improving processes.
              </p>
            </div>
          )}
        </div>
        
        <div>
          <CourseProgressCard course={course} />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
