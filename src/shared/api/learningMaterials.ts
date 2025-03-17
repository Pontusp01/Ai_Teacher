
import { apiConfig } from './index';
import { LearningMaterial } from '../types';
import { learningMaterialsData } from '../mock_data/learningMaterials';

/**
 * Get a list of learning materials
 * @param category Optional category to filter by
 * @returns Promise with list of learning materials
 */
export const getLearningMaterials = async (category?: string): Promise<LearningMaterial[]> => {
  if (apiConfig.useMockData) {
    // Use mock data
    if (category && category !== 'Alla') {
      return learningMaterialsData.filter(material => material.categories.includes(category));
    }
    return learningMaterialsData;
  } else {
    // Use real API
    const url = category 
      ? `${apiConfig.baseUrl}/learning-materials?category=${encodeURIComponent(category)}`
      : `${apiConfig.baseUrl}/learning-materials`;
      
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch learning materials: ${response.statusText}`);
    }
    return response.json();
  }
};

/**
 * Get a specific learning material
 * @param id Learning material ID
 * @returns Promise with learning material
 */
export const getLearningMaterial = async (id: string): Promise<LearningMaterial> => {
  if (apiConfig.useMockData) {
    // Use mock data
    const material = learningMaterialsData.find(m => m.id === id);
    if (!material) throw new Error(`Learning material with ID ${id} not found`);
    return material;
  } else {
    // Use real API
    const response = await fetch(`${apiConfig.baseUrl}/learning-materials/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch learning material: ${response.statusText}`);
    }
    return response.json();
  }
};

/**
 * Upload a new learning material
 * @param file File to upload
 * @param metadata Metadata for the learning material
 * @returns Promise with the uploaded learning material
 */
export const uploadLearningMaterial = async (
  file: File, 
  metadata: { title?: string; categories: string[] }
): Promise<LearningMaterial> => {
  if (apiConfig.useMockData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new learning material with generated ID
    const newMaterial: LearningMaterial = {
      id: `lm-${Date.now()}`,
      title: metadata.title || file.name,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadDate: new Date().toISOString(),
      categories: metadata.categories,
      indexedForAI: true,
      url: URL.createObjectURL(file) // This is just for mock purposes
    };
    
    return newMaterial;
  } else {
    // Use real API
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    const response = await fetch(`${apiConfig.baseUrl}/learning-materials`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to upload learning material: ${response.statusText}`);
    }
    
    return response.json();
  }
};
