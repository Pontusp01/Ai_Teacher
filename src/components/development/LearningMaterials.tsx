
import React from 'react';
import { Link } from 'react-router-dom';
import { Document } from '@/shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LearningMaterialsProps {
  documents: Document[];
  isLoading: boolean;
}

const LearningMaterials: React.FC<LearningMaterialsProps> = ({ documents, isLoading }) => {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Learning Materials</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center p-2 border-b">
                <div className="mr-3 bg-blue-100 p-2 rounded-md text-blue-700 text-xs font-medium">
                  {doc.fileType}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{doc.title}</h4>
                  <p className="text-xs text-gray-500">{doc.fileSize}</p>
                </div>
                <Link 
                  to={`/learn?courseId=doc-${doc.id}`}
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Study
                </Link>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LearningMaterials;
