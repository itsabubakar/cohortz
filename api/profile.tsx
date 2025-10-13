// api/profile.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileProp from '@/types/profileType';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token interceptor
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export interface UpdateProfileResponse {
  error: boolean;
  message: {
    FIRSTNAME: string;
    LASTNAME: string;
    USERNAME: string;
    LOCATION?: string;
    SOCIALS?: string;
    PROFILE_IMAGE?: string;
  };
}

export const updateProfile = async (data: ProfileProp): Promise<UpdateProfileResponse> => {
  const formData = new FormData();
  
  // Append text fields
  if (data.first_name) formData.append('first_name', data.first_name);
  if (data.last_name) formData.append('last_name', data.last_name);
  if (data.username) formData.append('username', data.username);
  if (data.password) formData.append('password', data.password);
  if (data.location) formData.append('location', data.location);
  if (data.socials) formData.append('socials', data.socials);
  
  // Append image if provided
  if (data.image) {
    formData.append('image', {
      uri: data.image.uri,
      type: data.image.type || 'image/jpeg',
      name: data.image.name || 'profile.jpg',
    } as any);
  }

  const response = await api.put('/v1/api/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};