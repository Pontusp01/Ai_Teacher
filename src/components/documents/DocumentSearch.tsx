
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const DocumentSearch: React.FC = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input 
        placeholder="Search documents..." 
        className="pl-10"
      />
    </div>
  );
};

export default DocumentSearch;
