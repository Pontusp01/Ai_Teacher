
import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook to handle progress synchronization based on page visibility
 */
export const useProgressSync = (forceUpdateProgress: (() => Promise<void>) | undefined) => {
  const pageVisibilityRef = useRef(document.visibilityState);
  const updateInProgressRef = useRef(false);
  const progressSyncedRef = useRef(false);
  
  // Handle page visibility changes to restore progress when returning to the tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';
      const wasHidden = pageVisibilityRef.current === 'hidden';
      
      if (isVisible && wasHidden && forceUpdateProgress) {
        console.log("Page became visible, restoring progress state");
        progressSyncedRef.current = false;
        // Add a small delay to ensure the page is fully visible before updating
        setTimeout(() => {
          if (forceUpdateProgress) forceUpdateProgress();
        }, 300);
      }
      
      pageVisibilityRef.current = document.visibilityState;
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [forceUpdateProgress]);

  // Setup periodic sync interval
  useEffect(() => {
    const syncTimer = setInterval(() => {
      if (forceUpdateProgress && !updateInProgressRef.current && document.visibilityState === 'visible') {
        updateInProgressRef.current = true;
        forceUpdateProgress().finally(() => {
          updateInProgressRef.current = false;
        });
      }
    }, 60000); // Sync every minute
    
    return () => clearInterval(syncTimer);
  }, [forceUpdateProgress]);

  return {
    updateInProgressRef,
    progressSyncedRef
  };
};
