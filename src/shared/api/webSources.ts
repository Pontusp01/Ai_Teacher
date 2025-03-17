
import { apiConfig } from './index';
import { WebSource } from '../types';
import { webSourcesData } from '../mock_data/webSources';

/**
 * Get a list of web sources
 * @param category Optional category to filter by
 * @returns Promise with list of web sources
 */
export const getWebSources = async (category?: string): Promise<WebSource[]> => {
  if (apiConfig.useMockData) {
    // Use mock data
    if (category && category !== 'Alla') {
      return webSourcesData.filter(source => source.categories.includes(category));
    }
    return webSourcesData;
  } else {
    // Use real API
    const url = category 
      ? `${apiConfig.baseUrl}/web-sources?category=${encodeURIComponent(category)}`
      : `${apiConfig.baseUrl}/web-sources`;
      
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch web sources: ${response.statusText}`);
    }
    return response.json();
  }
};

/**
 * Add a new web source
 * @param webSource Web source data
 * @returns Promise with the added web source
 */
export const addWebSource = async (webSource: Omit<WebSource, 'id'>): Promise<WebSource> => {
  if (apiConfig.useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create new web source with generated ID
    const newWebSource: WebSource = {
      id: `ws-${Date.now()}`,
      ...webSource,
      indexedDate: new Date().toISOString()
    };
    
    // In a real implementation, you'd update the mock data store here
    // For now, we'll just return the new object
    return newWebSource;
  } else {
    // Use real API
    const response = await fetch(`${apiConfig.baseUrl}/web-sources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webSource),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to add web source: ${response.statusText}`);
    }
    
    return response.json();
  }
};
