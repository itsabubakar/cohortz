import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaWrapper } from '@/HOC';
import { Text } from '@/theme/theme';
import { Button } from '@/components/ui';
import { router } from 'expo-router';

type Props = {};

const EmailConfirmation = (props: Props) => {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text variant={'l'}>Your email address</Text>
        <Text>We'll send you a quick email to confirm your address.</Text>
        <View style={{ marginTop: 36 }}>
          <Button
            text="Next"
            onPress={() => router.navigate('/(auth)/check-email')}
          />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default EmailConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {},
});
