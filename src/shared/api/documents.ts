
import { apiConfig } from './index';
import { Document } from '@/types/document';

/**
 * Get a list of available documents
 * @returns Promise with list of documents
 */
export const getDocuments = async (): Promise<Document[]> => {
  if (apiConfig.useMockData) {
    // Use mock data
    return [
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
    ];
  } else {
    // Use real API
    const response = await fetch(`${apiConfig.baseUrl}/documents`);
    if (!response.ok) {
      throw new Error(`Failed to fetch documents: ${response.statusText}`);
    }
    return response.json();
  }
};

/**
 * Get details for a specific document
 * @param id Document ID
 * @returns Promise with document details
 */
export const getDocumentDetails = async (id: string): Promise<Document> => {
  if (apiConfig.useMockData) {
    // Use mock data
    const docs = await getDocuments();
    const document = docs.find(d => d.id === id);
    
    if (!document) {
      throw new Error(`Document with ID ${id} not found`);
    }
    
    return document;
  } else {
    // Use real API
    const response = await fetch(`${apiConfig.baseUrl}/documents/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch document details: ${response.statusText}`);
    }
    return response.json();
  }
};
