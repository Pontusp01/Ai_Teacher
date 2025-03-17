
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '@/shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CoursesListProps {
  courses: Course[];
  isLoading: boolean;
}

const CoursesList: React.FC<CoursesListProps> = ({ courses, isLoading }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">My Courses</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <Link key={course.id} to={`/learn?courseId=${course.id}`}>
                <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-sm mb-1">{course.title}</h3>
                  <div className="flex items-center">
                    <Progress value={course.progress} className="h-2 flex-1 mr-3" />
                    <span className="text-xs text-gray-600">{course.progress}% completed</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoursesList;
