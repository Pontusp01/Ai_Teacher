
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { uploadLearningMaterial } from '@/shared/api/learningMaterials';
import DocumentUploadDialog from '@/components/documents/DocumentUploadDialog';
import DocumentSearch from '@/components/documents/DocumentSearch';
import CategorySidebar from '@/components/documents/CategorySidebar';
import DocumentsTabs from '@/components/documents/DocumentsTabs';
import { Document, Category } from '@/types/document';

const DocumentsPage = () => {
  const { toast } = useToast();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'COPC CX Standard 6.2',
      description: 'Complete reference guide for the COPC Customer Experience Standard version 6.2',
      fileType: 'PDF',
      fileSize: '4.2 MB',
      uploadDate: '2023-06-15',
      category: 'Standards',
      starred: true
    },
    {
      id: '2',
      title: 'KPI Implementation Guide',
      description: 'Step-by-step instructions for implementing key performance indicators',
      fileType: 'PDF',
      fileSize: '2.8 MB',
      uploadDate: '2023-07-20',
      category: 'Guidelines',
      starred: false
    },
    {
      id: '3',
      title: 'Quality Monitoring Form',
      description: 'Standard form for quality monitoring and evaluation',
      fileType: 'XLSX',
      fileSize: '1.5 MB',
      uploadDate: '2023-08-05',
      category: 'Templates',
      starred: true
    },
    {
      id: '4',
      title: 'COPC Implementation Roadmap',
      description: 'Strategic roadmap for implementing COPC standards in your organization',
      fileType: 'PDF',
      fileSize: '3.7 MB',
      uploadDate: '2023-05-12',
      category: 'Guidelines',
      starred: false
    },
    {
      id: '5',
      title: 'Customer Satisfaction Survey Template',
      description: 'Standardized survey for measuring customer satisfaction',
      fileType: 'DOCX',
      fileSize: '920 KB',
      uploadDate: '2023-09-01',
      category: 'Templates',
      starred: false
    },
    {
      id: '6',
      title: 'Performance Metrics Glossary',
      description: 'Comprehensive glossary of all performance metrics used in COPC',
      fileType: 'PDF',
      fileSize: '1.8 MB',
      uploadDate: '2023-04-18',
      category: 'Reference',
      starred: true
    }
  ]);

  const categories: Category[] = [
    { id: 'all', name: 'All Documents', count: documents.length },
    { id: 'standards', name: 'Standards', count: 1 },
    { id: 'guidelines', name: 'Guidelines', count: 2 },
    { id: 'templates', name: 'Templates', count: 2 },
    { id: 'reference', name: 'Reference', count: 1 }
  ];
  
  const recentDocuments = documents.slice(0, 3);
  const starredDocuments = documents.filter(doc => doc.starred);

  const handleUploadSuccess = (newDocument: any) => {
    toast({
      title: "Document uploaded",
      description: `${newDocument.title} has been successfully uploaded.`,
    });
    
    setDocuments([
      {
        id: newDocument.id,
        title: newDocument.title,
        description: `File: ${newDocument.fileName}`,
        fileType: newDocument.fileType.split('/')[1]?.toUpperCase() || 'FILE',
        fileSize: `${Math.round(newDocument.fileSize / 1024)} KB`,
        uploadDate: new Date(newDocument.uploadDate).toISOString().split('T')[0],
        category: newDocument.categories[0] || 'Uncategorized',
        starred: false
      },
      ...documents
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Documents Library</h1>
        <Button onClick={() => setIsUploadDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="mb-6">
            <DocumentSearch />
          </div>
          
          <CategorySidebar categories={categories} />
        </div>
        
        <div className="md:w-3/4">
          <DocumentsTabs 
            documents={documents}
            recentDocuments={recentDocuments}
            starredDocuments={starredDocuments}
          />
        </div>
      </div>

      <DocumentUploadDialog 
        open={isUploadDialogOpen} 
        onOpenChange={setIsUploadDialogOpen}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default DocumentsPage;
