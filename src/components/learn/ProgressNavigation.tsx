import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CompetenceLevelLegend from './CompetenceLevelLegend';
import { CourseProgress } from '@/shared/types';

// Import the MODULE_COMPETENCE
import { MODULE_COMPETENCE } from './CompetenceIndicator';

interface ProgressNavigationProps {
  courseId: string;
  progress: CourseProgress | null;
  currentModuleIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
  isFirstModule: boolean;
  isLastModule: boolean;
  showCompetenceLevel: boolean;
  competenceLevel: number;
  moduleCompetence?: number[];
  correctAttempts?: number[];
}

const ProgressNavigation: React.FC<ProgressNavigationProps> = ({
  courseId,
  progress,
  currentModuleIndex,
  handlePrevious,
  handleNext,
  isFirstModule,
  isLastModule,
  showCompetenceLevel,
  competenceLevel,
  moduleCompetence = [],
  correctAttempts = []
}) => {
  // Use a ref to prevent unnecessary re-renders
  const initialized = useRef(false);
  
  // Get competence values from global or local storage
  const [moduleCompetenceValues, setModuleCompetenceValues] = useState<number[]>([]);
  
  // Initialize the competence values once
  useEffect(() => {
    // Skip if we've already initialized the values
    if (initialized.current) return;
    
    let values: number[] = [];
    let source = '';
    
    // First try to use the global MODULE_COMPETENCE
    if (MODULE_COMPETENCE && MODULE_COMPETENCE.values) {
      values = Object.values(MODULE_COMPETENCE.values) as number[];
      source = 'MODULE_COMPETENCE';
    } 
    // Fall back to the passed prop
    else if (moduleCompetence && moduleCompetence.length > 0) {
      values = [...moduleCompetence];
      source = 'props';
    }
    // Try to get from localStorage as a last resort
    else {
      try {
        const storedModuleProgress = localStorage.getItem(`course_${courseId}_module_progress`);
        if (storedModuleProgress) {
          values = JSON.parse(storedModuleProgress);
          source = 'localStorage';
        }
      } catch (error) {
        console.error('Error parsing module progress from localStorage:', error);
      }
    }
    
    // Only update state if we have values
    if (values.length > 0) {
      console.log(`Using ${source} values:`, values);
      setModuleCompetenceValues(values);
      initialized.current = true;
    }
  }, [courseId]); // Only depend on courseId to avoid infinite loops

  // Update when moduleCompetence changes - with safeguards
  useEffect(() => {
    // Skip the initial render
    if (!initialized.current) return;
    
    // Only update when the prop really changes and has values
    if (moduleCompetence && moduleCompetence.length > 0) {
      // Deep compare to prevent unnecessary updates
      const currentValues = JSON.stringify(moduleCompetenceValues);
      const newValues = JSON.stringify(moduleCompetence);
      
      if (currentValues !== newValues) {
        console.log('Updating from props:', moduleCompetence);
        setModuleCompetenceValues([...moduleCompetence]);
      }
    }
  }, [moduleCompetence]); // Only depend on moduleCompetence

  // Count completed modules (100%)
  const completedModulesCount = moduleCompetenceValues.filter(comp => comp === 100).length;
  
  // Count in-progress modules (>0% and <100%)
  const inProgressModulesCount = moduleCompetenceValues.filter(comp => comp > 0 && comp < 100).length;
  
  // Total modules with a fallback
  const totalModulesCount = moduleCompetenceValues.length || 7; // Fallback to 7 modules
  
  // Calculate percentage
  const progressValue = totalModulesCount > 0 
    ? Math.round((completedModulesCount / totalModulesCount) * 100) 
    : 0;
  
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={handlePrevious}
          variant="outline"
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {isFirstModule ? 'Back to Development' : 'Previous Module'}
        </Button>
        
        <Button
          onClick={handleNext}
          variant="outline"
          className="flex items-center"
        >
          {isLastModule ? 'Finish Course' : 'Next Module'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600">Course Progress</span>
          <span className="text-sm font-medium">{progressValue}%</span>
        </div>
        <Progress value={progressValue} className="h-2" />
        
        <div className="mt-2 text-xs text-gray-600">
          <span>{completedModulesCount} of {totalModulesCount} modules completed</span>
          {inProgressModulesCount > 0 && (
            <span className="ml-2">({inProgressModulesCount} in progress)</span>
          )}
        </div>
      </div>
      
      {showCompetenceLevel && (
        <CompetenceLevelLegend
        />
      )}
    </div>
  );
};

export default ProgressNavigation;