
import { useQuery } from '@tanstack/react-query';
import { getCourses, getDocuments } from '@/shared/api';
import { Course, Document } from '@/shared/types';
import { useToast } from '@/hooks/use-toast';

export const useDevelopmentData = () => {
  const { toast } = useToast();

  // Query for courses data
  const coursesQuery = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
    meta: {
      onSuccess: (data: Course[]) => {
        console.log('Courses data loaded successfully:', data);
      },
      onError: (error: Error) => {
        console.error('Error fetching courses:', error);
        toast({
          title: 'Error fetching courses',
          description: 'An error occurred while fetching courses data.',
          variant: 'destructive',
        });
      }
    }
  });

  // Query for documents data
  const documentsQuery = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
    meta: {
      onSuccess: (data: Document[]) => {
        console.log('Documents data loaded successfully:', data);
      },
      onError: (error: Error) => {
        console.error('Error fetching documents:', error);
        toast({
          title: 'Error fetching documents',
          description: 'An error occurred while fetching documents data.',
          variant: 'destructive',
        });
      }
    }
  });

  // Determine if either query is loading
  const isLoading = coursesQuery.isLoading || documentsQuery.isLoading;
  
  // Process the data once we have both results
  const courses = coursesQuery.data || [];
  const documents = documentsQuery.data || [];
  
  return { 
    courses, 
    documents, 
    isLoading,
    isError: coursesQuery.isError || documentsQuery.isError
  };
};
