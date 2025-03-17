
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentList from './DocumentList';

interface Document {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  category: string;
  starred: boolean;
}

interface DocumentsTabsProps {
  documents: Document[];
  recentDocuments: Document[];
  starredDocuments: Document[];
}

const DocumentsTabs: React.FC<DocumentsTabsProps> = ({ 
  documents, 
  recentDocuments, 
  starredDocuments 
}) => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-6">
        <TabsTrigger value="all">All Documents</TabsTrigger>
        <TabsTrigger value="recent">Recent</TabsTrigger>
        <TabsTrigger value="starred">Starred</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <DocumentList documents={documents} />
      </TabsContent>
      
      <TabsContent value="recent" className="mt-0">
        <DocumentList documents={recentDocuments} />
      </TabsContent>
      
      <TabsContent value="starred" className="mt-0">
        <DocumentList documents={starredDocuments} />
      </TabsContent>
    </Tabs>
  );
};

export default DocumentsTabs;
