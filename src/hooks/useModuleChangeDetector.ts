
import { useEffect, useRef } from 'react';

/**
 * Hook to detect changes in the current module and trigger progress updates
 */
export const useModuleChangeDetector = (
  currentModuleIndex: number | null, 
  forceUpdateProgress: (() => Promise<void>) | undefined
) => {
  const prevModuleIndexRef = useRef<number | null>(null);
  
  // Track module changes to trigger progress updates when needed
  useEffect(() => {
    if (currentModuleIndex !== null && 
        currentModuleIndex !== prevModuleIndexRef.current && 
        forceUpdateProgress) {
      prevModuleIndexRef.current = currentModuleIndex;
      
      // Wait for a moment to ensure all state is updated
      const timer = setTimeout(() => {
        console.log("Module changed, updating progress...");
        if (forceUpdateProgress) forceUpdateProgress();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentModuleIndex, forceUpdateProgress]);
};
