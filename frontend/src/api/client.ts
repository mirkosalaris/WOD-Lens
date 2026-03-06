import axios from 'axios';
import { CapacityProfile } from '../types/capacity';

const API_BASE = '/api';

export const uploadExcel = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAnalysis = async (): Promise<CapacityProfile> => {
  const response = await axios.get(`${API_BASE}/analysis`);
  return response.data;
};

export const getAIInsight = async (): Promise<{ insight: str }> => {
  const response = await axios.post(`${API_BASE}/ai-insight`);
  return response.data;
};
