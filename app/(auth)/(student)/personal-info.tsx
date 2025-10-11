import { Alert, Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaWrapper } from '@/HOC';
import { Input } from '@/components/Form';
import { Header } from '@/ui';
import { Text } from '@/theme/theme';
import { BackArrowIcon } from '@/assets/icons';
import { Link } from 'expo-router';
import { useUpdateProfile } from '@/hooks/api/useProfileHook';
import { useProfileStore } from '@/store/profileStore';
 
const CommunityInfo = () => {
  
  const { username } = useProfileStore();
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();
  
  const [formData, setFormData] = useState({
    username: username,
    password: '',
  });

  
  useEffect(() => {
    setFormData({
      username: username,
      password: '',
    });
  }, [username]);
    const handleSubmit = () => {
    // Filter out empty fields
    const updateData: any = {};
    
    if (formData.username && formData.username !== username) {
      updateData.username = formData.username;
    }
    
    if (formData.password) {
      updateData.password = formData.password;
    }

    // Check if there are any changes
    if (Object.keys(updateData).length === 0) {
      Alert.alert('No changes detected');
      return;
    }

    updateProfile(updateData);
    console.log("passed ")
  };
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <SafeAreaWrapper style={{ display: "flex", flexDirection: "column", gap: 20}}>
      <View style={{ marginTop: 24, }}>
        <Header number={2} total={2} />
        <View>
          <Text
            style={styles.header}
          >
            What username do you want to use?
          </Text>
        </View>
        <View style={{ gap: 24 }}>
          <Input
            label="Username"
            value={formData.username}
            onChangeText={(value: string) => handleChange("username", value)} 
            placeholder="Username" />
        </View>
      </View>

      <View>
        <Text style={styles.header}>Set Password</Text>
        
        <View style={{ gap: 24 }}>
          <Input
            label="Password"
            value={formData.password}
            onChangeText={(value: string) => handleChange("password", value)}
            placeholder="create a password" />
          <Input label="Re-type Password" placeholder="re-type your password" />
        </View>
      </View>

      <Link asChild href="/student-screens/cohorts">
        <Pressable
        onPress={handleSubmit}
          style={{
            borderWidth: 1,
            borderColor: '#F8F1FF',
            paddingVertical: 14,
            alignItems: 'center',
            borderRadius: 32,
            backgroundColor: '#391D65',
          }}
        >
          <Text style={{ color: '#fff' }}>next</Text>
        </Pressable>
      </Link>
      <Pressable
        style={{
          paddingVertical: 14,
          alignItems: 'center',
          marginTop: 32,
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        <BackArrowIcon />
        <Text style={{ color: '#391D65' }}>Back</Text>
      </Pressable>
    </SafeAreaWrapper>
  );
};

export default CommunityInfo;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontFamily: 'DMSansMedium',
    marginBottom: 18,
    marginTop: 16,
    color: '#B085EF',
  }
});
