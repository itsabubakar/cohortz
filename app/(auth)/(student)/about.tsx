import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaWrapper } from '@/HOC';
import { CustomCheckbox, Input } from '@/components/Form';
import { Header } from '@/ui';
import { Text } from '@/theme/theme';
import { BackArrowIcon } from '@/assets/icons';
import { router, useLocalSearchParams } from 'expo-router';
import axios, { AxiosResponse } from 'axios';

// ✅ Define types for form state
interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

// ✅ Define backend response type
interface UpdateProfileResponse {
  error: boolean;
  message: {
    FIRSTNAME?: string;
    LASTNAME?: string;
    USERNAME?: string;
  };
}

const About = () => {
  const [data, setData] = useState<FormData>({
    firstName: 'hhj',
    lastName: 'oipj',
    username: 'hamid',
    password: 'password',
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { token } = useLocalSearchParams<{ token: string }>();
  const apiURL = process.env.EXPO_PUBLIC_API_URL as string;

  const handleUpdate = (field: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

const handleSubmit = async () => {
  if (!isChecked) {
    Alert.alert('Please accept the terms and conditions');
    return;
  }

  // Build payload with only filled fields
  const payload: Record<string, string> = {};
  if (data.firstName.trim()) payload.first_name = data.firstName.trim();
  if (data.lastName.trim()) payload.last_name = data.lastName.trim();
  if (data.username.trim()) payload.username = data.username.trim();
  if (data.password.trim()) payload.password = data.password.trim();

  if (Object.keys(payload).length === 0) {
    Alert.alert('Error', 'Please fill at least one field');
    return;
  }

  // Validate password length if provided
  if (payload.password && payload.password.length < 6) {
    Alert.alert('Error', 'Password must be at least 6 characters long');
    return;
  }

  setLoading(true);

  try {
    const response: AxiosResponse<UpdateProfileResponse> = await axios.put(
      `${apiURL}/v1/api/profile`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data;
    console.log('Response:', result);

    if (result.error) {
      // Handle specific validation errors from backend
      const errorMessage = result.message || 'Update failed, please try again';
      Alert.alert('Error', typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } else {
      Alert.alert('Success', 'Profile updated successfully');
      router.push('/personal-info');
    }
  } catch (err: any) {
    console.error('Error updating profile:', err.response?.data || err.message);
    
    // Handle different types of errors
    if (err.response?.data) {
      const errorData = err.response.data;
      Alert.alert('Error', errorData.message || 'Update failed');
    } else if (err.request) {
      Alert.alert('Error', 'Network error - please check your connection');
    } else {
      Alert.alert('Error', 'Something went wrong while updating your profile');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Header number={1} total={2} />

        <Text style={styles.title}>Tell us about yourself 😄</Text>

        <View style={{ gap: 24 }}>
          <Input
            label="First Name"
            placeholder="First name"
            value={data.firstName}
            onChangeText={(value:string) => handleUpdate('firstName', value)}
          />
          <Input
            label="Last Name"
            placeholder="Last name"
            value={data.lastName}
            onChangeText={(value: string) => handleUpdate('lastName', value)}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <CustomCheckbox
            checked={isChecked}
            onToggle={() => setIsChecked(prev => !prev)}
          />
          <Text>
            I agree to the{' '}
            <Text style={styles.linkText}>terms</Text> and{' '}
            <Text style={styles.linkText}>privacy policy</Text>.
          </Text>
        </View>

        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          style={[styles.submitBtn, loading && styles.disabledBtn]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Next</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <BackArrowIcon />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaWrapper>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'DMSansMedium',
    marginBottom: 80,
  },
  checkboxContainer: {
    flexDirection: 'row',
    gap: 8,
    alignContent: 'center',
    marginTop: 80,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#391D65',
  },
  submitBtn: {
    borderWidth: 1,
    borderColor: '#F8F1FF',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 32,
    marginTop: 48,
    backgroundColor: '#391D65',
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },
  submitText: {
    color: '#fff',
  },
  backBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  backText: {
    color: '#391D65',
  },
});
