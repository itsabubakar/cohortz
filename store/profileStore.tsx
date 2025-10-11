// stores/profileStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileState {
  firstName: string;
  lastName: string;
  username: string;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: { firstName: string; lastName: string; username: string }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      firstName: '',
      lastName: '',
      username: '',
      isLoading: false,
      error: null,
      setProfile: (profile) => set({
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
      }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        firstName: state.firstName,
        lastName: state.lastName,
        username: state.username,
      }),
    }
  )
);