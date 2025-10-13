// hooks/api/useProfileHook.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile } from '@/api/getProfile';
import { updateProfile } from '@/api/profile';
import ProfileProp from '@/types/profileType';

// GET profile hook
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Refresh profile hook
export const useRefreshProfile = () => {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ['profile'] });
  };
};

// Update profile hook
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile, // your axios call
    onSuccess: () => {
      // 🔥 Forces the profile screen to refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};