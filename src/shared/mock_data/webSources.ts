
import { WebSource } from '../types';

// Mock data for web sources
export const webSourcesData: WebSource[] = [
  {
    id: 'ws1',
    url: 'https://www.copc.com/standards/customer-experience/',
    title: 'COPC Customer Experience Standard',
    description: 'Officiell webbsida med information om COPC CX-standarden',
    type: 'public',
    indexedDate: '2025-03-10',
    categories: ['COPC', 'Utbildning']
  },
  {
    id: 'ws2',
    url: 'https://dynavanet.internal/utbildning/copc-guide/',
    title: 'Intern COPC-guide',
    description: 'Intern guide för implementering av COPC-standarden',
    type: 'internal',
    indexedDate: '2025-03-13',
    categories: ['COPC', 'Utbildning'],
    restricted: true
  },
  {
    id: 'ws3',
    url: 'https://business-english.com/customer-service-phrases/',
    title: 'Business English for Customer Service',
    description: 'Guide för affärsengelska inom kundtjänst',
    type: 'public',
    indexedDate: '2025-02-28',
    categories: ['Språk', 'Utbildning']
  }
];
