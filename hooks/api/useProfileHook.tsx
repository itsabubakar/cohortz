// hooks/useProfileMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService, UpdateProfileData } from '@/api/profile';
import { useProfileStore } from '@/store/profileStore';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setProfile, setLoading, setError, clearError } = useProfileStore();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => profileService.updateProfile(data),
    onMutate: () => {
      setLoading(true);
      clearError();
    },
    onSuccess: (response) => {
      if (!response.error) {
        // Update local state with new profile data
        setProfile({
          firstName: response.message.FIRSTNAME,
          lastName: response.message.LASTNAME,
          username: response.message.USERNAME,
        });
        
        // Invalidate any related queries
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || 'Something went wrong');
    },
    onSettled: () => {
      setLoading(false);
    },
  });
};