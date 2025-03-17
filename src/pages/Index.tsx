
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, FileText, Globe, BarChart } from 'lucide-react';
import { getCourses } from '@/shared/api';
import { Course } from '@/shared/types';

const Index: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter started courses (those with progress > 0)
  const startedCourses = courses.filter(course => course.progress > 0);

  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      title: 'Courses and Learning',
      description: 'Explore our COPC training and learn best practices for contact centers.',
      path: '/development'
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: 'Exams and Knowledge Tests',
      description: 'Test your knowledge of the COPC standard with interactive questions.',
      path: '/exams'
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: 'Web Sources',
      description: 'Explore knowledge sources and articles about COPC and customer service standards.',
      path: '/web-sources'
    },
    {
      icon: <BarChart className="h-6 w-6 text-blue-600" />,
      title: 'My Development',
      description: 'Track your learning and see your progress in courses and modules.',
      path: '/development'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Removed duplicate Header as it's already included in Layout.tsx */}
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Welcome to Dynava AI Teacher</h1>
            
            {startedCourses.length > 0 ? (
              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-medium mb-4">Continue where you left off</h2>
                
                {startedCourses.map(course => (
                  <div key={course.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center border-l-4 border-blue-600 pl-4 py-2">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-gray-600">
                          {course.progress > 40 ? '3 of 7' : '1 of 7'} modules completed • {course.progress > 30 ? '12 hours' : '4 hours'} spent
                        </p>
                      </div>
                      
                      <div className="mt-3 md:mt-0 md:ml-auto flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{course.progress}%</span>
                      </div>
                      
                      <Link to={`/learn?courseId=${course.id}`} className="mt-3 md:mt-0 md:ml-4">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Continue Learning
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="mt-4 bg-blue-50 p-3 rounded text-sm text-blue-700">
                      Next recommended module: {course.id === 'course1' ? '3.4 Process-KPIs' : '1.2 KPI Implementation Process'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-medium mb-4">Welcome to Dynava AI Teacher</h2>
                <p className="text-gray-600 mb-4">Start your learning journey by exploring our courses.</p>
                <Link to="/development">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Link key={index} to={feature.path}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        {feature.icon}
                        <CardTitle className="ml-2 text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">COPC AI Coach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Personalized help based on your learning. Ask questions about COPC or get help with your studies.
                </p>
                
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-800 mb-1">Explain how FCR is measured according to COPC</p>
                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                      <p className="text-sm">
                        According to the COPC standard, FCR (First Contact Resolution) is measured in two ways:
                      </p>
                      <ol className="text-sm list-decimal pl-5 mt-2">
                        <li>Internal measurement: By tracking if the customer returns with the same issue within 5-7 days</li>
                        <li>External measurement: By asking the customer after contact if their problem was resolved on the first attempt</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-800 mb-1">What are the most important KPIs for a COPC-certified contact center?</p>
                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                      <p className="text-sm">The most important KPIs in a COPC-certified contact center are:</p>
                      <ol className="text-sm list-decimal pl-5 mt-2">
                        <li>Service Level (SL): 80% of calls answered within 20 seconds</li>
                        <li>First Contact Resolution (FCR): At least 75% resolved on first contact</li>
                        <li>Customer Satisfaction (CSAT): At least 90% satisfied customers</li>
                        <li>Quality Score: At least 90% on quality evaluations</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button className="w-full" variant="outline">
                    Ask a question to the AI Coach
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Current Learning Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">KPI understanding for COPC certification</p>
                
                <div className="mt-4 flex items-center">
                  <div className="flex-1 mr-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: '80%' }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">80%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
