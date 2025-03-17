
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Star } from 'lucide-react';

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

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map(doc => (
        <Card key={doc.id} className="h-full">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              {doc.starred && (
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            <CardTitle className="text-lg mt-3">{doc.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
            <div className="flex text-xs text-gray-500 space-x-4">
              <span>{doc.fileType}</span>
              <span>{doc.fileSize}</span>
              <span>{doc.category}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-between">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DocumentList;
