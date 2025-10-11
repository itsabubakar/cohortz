// services/profileService.ts
import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or AsyncStorage for React Native
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
}

export interface UpdateProfileResponse {
  error: boolean;
  message: {
    FIRSTNAME: string;
    LASTNAME: string;
    USERNAME: string;
  };
}

export const profileService = {
  updateProfile: async (data: UpdateProfileData): Promise<UpdateProfileResponse> => {
    const response = await api.put('/v1/api/profile', data);
    return response.data;
  },
};