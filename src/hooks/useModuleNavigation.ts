import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getTotalModulesForCourse } from './../hooks/courseData/courseProgressUtils';

export const useModuleNavigation = (courseId: string) => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number | null>(null); // Changed to null initially
  const [selectedAnswer, setSelectedAnswer] = useState("option1");
  const previousModuleRef = useRef<number | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const queryParams = new URLSearchParams(location.search);
  const moduleParam = queryParams.get('module');
  
  const totalModules = getTotalModulesForCourse(courseId);
  const lastModuleIndex = totalModules - 1;
  
  useEffect(() => {
    if (moduleParam) {
      const moduleIndex = parseInt(moduleParam, 10);
      if (!isNaN(moduleIndex) && moduleIndex >= 0) {
        if (currentModuleIndex !== moduleIndex) {
          setCurrentModuleIndex(moduleIndex);
          previousModuleRef.current = moduleIndex;
        }
      }
    } else if (previousModuleRef.current !== null) {
      // If no module param but we had a previous module, restore it to URL
      const newParams = new URLSearchParams(queryParams);
      newParams.set('module', previousModuleRef.current.toString());
      navigate(`/learn?${newParams.toString()}`, { replace: true });
    }
  }, [moduleParam, navigate, queryParams, currentModuleIndex]);

  // Calculate these values conditionally based on whether currentModuleIndex is null
  const isFirstModule = currentModuleIndex === 0;
  const isLastModule = currentModuleIndex === lastModuleIndex;

  const handlePrevious = () => {
    if (currentModuleIndex !== null && currentModuleIndex > 0) {
      const newIndex = currentModuleIndex - 1;
      setCurrentModuleIndex(newIndex);
      previousModuleRef.current = newIndex;
      
      const newParams = new URLSearchParams(queryParams);
      newParams.set('module', newIndex.toString());
      navigate(`/learn?${newParams.toString()}`);
      
      toast({
        title: "Navigation",
        description: "Moving to previous module",
      });
    } else {
      navigate('/development');
    }
  };
  
  const handleNext = () => {
    if (currentModuleIndex !== null && currentModuleIndex < totalModules - 1) {
      const newIndex = currentModuleIndex + 1;
      setCurrentModuleIndex(newIndex);
      previousModuleRef.current = newIndex;
      
      const newParams = new URLSearchParams(queryParams);
      newParams.set('module', newIndex.toString());
      navigate(`/learn?${newParams.toString()}`);
      
      toast({
        title: "Navigation",
        description: "Moving to next module",
      });
    }
  };

  const handleModuleSelect = (index: number) => {
    setCurrentModuleIndex(index);
    previousModuleRef.current = index;
    
    const newParams = new URLSearchParams(queryParams);
    newParams.set('module', index.toString());
    navigate(`/learn?${newParams.toString()}`);
  };

  return {
    currentModuleIndex,
    isFirstModule,
    isLastModule,
    selectedAnswer,
    setSelectedAnswer,
    handlePrevious,
    handleNext,
    handleModuleSelect,
    totalModules
  };
};