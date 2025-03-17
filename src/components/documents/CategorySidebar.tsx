
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Clock, Download } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategorySidebarProps {
  categories: Category[];
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id}>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:text-blue-700 font-normal"
              >
                <span>{category.name}</span>
                <span className="ml-auto bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-3">Quick Access</h3>
        <Button variant="outline" className="w-full mb-2 justify-start">
          <Star className="mr-2 h-4 w-4" />
          Starred Documents
        </Button>
        <Button variant="outline" className="w-full mb-2 justify-start">
          <Clock className="mr-2 h-4 w-4" />
          Recently Viewed
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Download className="mr-2 h-4 w-4" />
          Downloaded
        </Button>
      </div>
    </>
  );
};

export default CategorySidebar;
