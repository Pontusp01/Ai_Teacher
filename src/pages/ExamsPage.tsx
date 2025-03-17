
import React, { useState, useEffect } from 'react';
import { getExams } from '@/shared/api';
import { getDocuments } from '@/shared/api/documents';
import { Exam, Document } from '@/shared/types';
import { Button } from '@/components/ui/button';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ExamCard from '@/components/exams/ExamCard';

const ExamsPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [selectedDocument, setSelectedDocument] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 4;
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsData, documentsData] = await Promise.all([
          getExams(),
          getDocuments()
        ]);
        setExams(examsData);
        setDocuments(documentsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error fetching data',
          description: 'An error occurred while fetching the data.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleCreateExam = () => {
    if (!newExamTitle.trim() || !selectedDocument) {
      toast({
        title: "Missing information",
        description: "Please provide a title and select a document.",
        variant: "destructive",
      });
      return;
    }

    // Find the selected document
    const document = documents.find(doc => doc.id === selectedDocument);
    
    // Create a new exam
    const newExam: Exam = {
      id: `exam-${Date.now()}`,
      title: newExamTitle,
      baseDocument: document ? document.title : '',
      createdDate: new Date().toISOString().split('T')[0]
    };

    // Add the new exam to the list
    setExams([...exams, newExam]);
    
    // Close the dialog and reset form
    setIsCreateDialogOpen(false);
    setNewExamTitle('');
    setSelectedDocument('');
    
    // Show success toast
    toast({
      title: "Exam created",
      description: `The exam "${newExamTitle}" has been created successfully.`,
    });
  };
  
  // Calculate pagination
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);
  const totalPages = Math.ceil(exams.length / examsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Available Exams</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-medium mb-2">Create New Exam</h2>
        <p className="text-sm text-gray-600 mb-4">
          Choose documents, web pages, or other materials as the basis for a new exam.
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Exam
        </Button>
      </div>
      
      {isLoading ? (
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
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {currentExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
          
          {exams.length > examsPerPage && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={goToPrevPage} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext onClick={goToNextPage} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Exam</DialogTitle>
            <DialogDescription>
              Create a new exam based on a document from your library.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="exam-title" className="text-right">
                Title
              </Label>
              <Input
                id="exam-title"
                value={newExamTitle}
                onChange={(e) => setNewExamTitle(e.target.value)}
                className="col-span-3"
                placeholder="COPC Standard Quiz"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document" className="text-right">
                Document
              </Label>
              <Select
                value={selectedDocument}
                onValueChange={setSelectedDocument}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a document" />
                </SelectTrigger>
                <SelectContent>
                  {documents.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleCreateExam}>
              Create Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamsPage;
