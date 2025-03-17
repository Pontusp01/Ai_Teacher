
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Globe, Search, ExternalLink, BookmarkPlus, Filter } from 'lucide-react';

const WebSourcesPage = () => {
  // Mock data for web sources
  const webSources = [
    {
      id: '1',
      title: 'COPC Inc. Official Website',
      description: 'The official website for COPC Inc. containing standards, certification information, and resources.',
      url: 'https://www.copc.com',
      categories: ['Official', 'Standards'],
      type: 'external',
      hasAccess: true
    },
    {
      id: '2',
      title: 'Customer Experience Industry Trends',
      description: 'Latest research and trends in the customer experience management industry.',
      url: 'https://www.example.com/cx-trends',
      categories: ['Research', 'Industry'],
      type: 'external',
      hasAccess: true
    },
    {
      id: '3',
      title: 'COPC Implementation Guide',
      description: 'Comprehensive guide for implementing COPC standards in your organization.',
      url: 'https://internal.example.com/copc-guide',
      categories: ['Implementation', 'Internal'],
      type: 'internal',
      hasAccess: true
    },
    {
      id: '4',
      title: 'Contact Center Performance Metrics',
      description: 'Detailed explanation of all the key performance metrics for contact centers.',
      url: 'https://www.example.com/cc-metrics',
      categories: ['Metrics', 'Performance'],
      type: 'external',
      hasAccess: true
    },
    {
      id: '5',
      title: 'COPC Case Studies Collection',
      description: 'Collection of case studies showing successful COPC implementation.',
      url: 'https://internal.example.com/case-studies',
      categories: ['Case Studies', 'Internal'],
      type: 'internal',
      hasAccess: true
    },
    {
      id: '6',
      title: 'Customer Experience Professional Association',
      description: 'Professional association for CX professionals with resources and certification programs.',
      url: 'https://www.cxpa.org',
      categories: ['Professional', 'Association'],
      type: 'external',
      hasAccess: true
    }
  ];

  const categories = [
    { id: 'official', name: 'Official', count: 1 },
    { id: 'standards', name: 'Standards', count: 1 },
    { id: 'research', name: 'Research', count: 1 },
    { id: 'implementation', name: 'Implementation', count: 1 },
    { id: 'metrics', name: 'Metrics', count: 1 },
    { id: 'case-studies', name: 'Case Studies', count: 1 }
  ];
  
  const externalSources = webSources.filter(source => source.type === 'external');
  const internalSources = webSources.filter(source => source.type === 'internal');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Web Sources</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search web sources..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Categories</h3>
              <Filter className="h-4 w-4 text-gray-500" />
            </div>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id} className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-blue-700 font-normal"
                  >
                    {category.name}
                  </Button>
                  <Badge variant="outline">{category.count}</Badge>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-3">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="mr-2 h-4 w-4" />
                  All Web Sources
                </Button>
              </li>
              <li>
                <Button variant="outline" className="w-full justify-start">
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Bookmarked Sources
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="md:w-3/4">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Sources</TabsTrigger>
              <TabsTrigger value="external">External</TabsTrigger>
              <TabsTrigger value="internal">Internal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {webSources.map(source => (
                  <Card key={source.id} className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-start">
                        <div className={`bg-${source.type === 'internal' ? 'purple' : 'blue'}-100 p-2 rounded-lg`}>
                          <Globe className={`h-6 w-6 text-${source.type === 'internal' ? 'purple' : 'blue'}-600`} />
                        </div>
                      </div>
                      <CardTitle className="text-lg mt-3">{source.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{source.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {source.categories.map((category, index) => (
                          <Badge key={index} variant="outline">{category}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{source.url}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center"
                      >
                        <BookmarkPlus className="h-4 w-4 mr-1" />
                        Bookmark
                      </Button>
                      <Button 
                        size="sm"
                        className="flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="external" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {externalSources.map(source => (
                  <Card key={source.id} className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Globe className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <CardTitle className="text-lg mt-3">{source.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{source.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {source.categories.map((category, index) => (
                          <Badge key={index} variant="outline">{category}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{source.url}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center"
                      >
                        <BookmarkPlus className="h-4 w-4 mr-1" />
                        Bookmark
                      </Button>
                      <Button 
                        size="sm"
                        className="flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="internal" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {internalSources.map(source => (
                  <Card key={source.id} className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Globe className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                      <CardTitle className="text-lg mt-3">{source.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{source.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {source.categories.map((category, index) => (
                          <Badge key={index} variant="outline">{category}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{source.url}</p>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center"
                      >
                        <BookmarkPlus className="h-4 w-4 mr-1" />
                        Bookmark
                      </Button>
                      <Button 
                        size="sm"
                        className="flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WebSourcesPage;
