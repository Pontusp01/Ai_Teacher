
import { LearningMaterial } from '../types';

// Mock data for learning materials
export const learningMaterialsData: LearningMaterial[] = [
  {
    id: 'lm1',
    title: 'COPC_2021_CX_Standard_for_Contact_Centers_Release_7.0.pdf',
    fileName: 'COPC_2021_CX_Standard_for_Contact_Centers_Release_7.0.pdf',
    fileSize: 4500000, // 4.5 MB
    fileType: 'application/pdf',
    uploadDate: '2025-03-05',
    categories: ['COPC', 'Utbildning'],
    indexedForAI: true,
    url: '#' // In a real app, this would be a URL to the file
  },
  {
    id: 'lm2',
    title: 'English_Business_Communication_Manual.pdf',
    fileName: 'English_Business_Communication_Manual.pdf',
    fileSize: 2800000, // 2.8 MB
    fileType: 'application/pdf',
    uploadDate: '2025-03-10',
    categories: ['Språk', 'Utbildning'],
    indexedForAI: true,
    url: '#' // In a real app, this would be a URL to the file
  },
  {
    id: 'lm3',
    title: 'COPC_KPI_Calculation_Examples.xlsx',
    fileName: 'COPC_KPI_Calculation_Examples.xlsx',
    fileSize: 1200000, // 1.2 MB
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    uploadDate: '2025-03-12',
    categories: ['COPC', 'Uppdragsutbildning'],
    indexedForAI: false,
    url: '#' // In a real app, this would be a URL to the file
  }
];
