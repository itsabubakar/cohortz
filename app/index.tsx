import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/utils/lib/supabase';
import { getItem } from '../utils/asyncStorage';
import { View, ActivityIndicator } from 'react-native';

export default function InitialScreen() {
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      const onboarded = await getItem('onboarded');
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(onboarded);

      if (!onboarded) {
        router.replace('/(auth)/onboarding');
      } else if (session && session.user) {
        router.replace('/(home)/home');
      } else {
        router.replace('/(auth)');
      }
    };

    initialize();
  }, []);

  // Show a loading indicator while deciding where to route the user
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
