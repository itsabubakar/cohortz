import { Alert, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaWrapper } from '@/HOC';
import { Input } from '@/components/Form';
import { Header } from '@/ui';
import { Text } from '@/theme/theme';
import { BackArrowIcon } from '@/assets/icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

const CommunityInfo = () => {
  const [data, setData] = useState({
    name: "",
    url: ""
  })
  const { token } = useLocalSearchParams<{ token: string }>()
  const router = useRouter()
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  const handleComunityCreate = async () => {
  console.log("New: ", token)
    if (!token) {
      Alert.alert('Authentication Error', 'No auth token found. Please log in again.');
    }
    // Handle community creation logic here
    try {
      const response = await axios.post(`${apiURL}/v1/api/cohorts`, {
        name: data.name,
        url: data.url
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
    }
    );
    console.log(response.data)
      router.navigate({
        pathname: '/(auth)/(convener)/more-info',
        params: {cohort_id: response.data.cohort_id, token}
      })
      return response.data
    }
    catch (error) {
      console.error('Error during login:', error);
    }
  }
  return (
    <SafeAreaWrapper>
      <View style={{ marginTop: 24 }}>
        <Header number={2} />
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontFamily: 'DMSansMedium',
              marginBottom: 8,
              color: '#B085EF',
            }}
          >
            Now let’s create your community.
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'DMSansMedium',
              marginBottom: 32,
              color: '#B085EF',
            }}
          >
            Don’t worry - you can always change this information later
          </Text>
        </View>
        <View style={{ gap: 24 }}>
          <Input value={data.name} onChangeText={(name: string) => setData(prev => ({ ...prev, name }))} label="Name your cohort" placeholder="Muhammad's Community" />
          <View>
            <Input value={data.url} onChangeText={(url: string) => setData(prev => ({ ...prev, url }))} label="Community URL" placeholder="muhammads-community" />
            <Text style={{ fontSize: 12, color: '#999', paddingTop: 8 }}>
              We'll and the "/cohortz.com"
            </Text>
          </View>
        </View>
      </View>

      <Link asChild href="/(auth)/(convener)/community-info">
        <Pressable
      onPress={handleComunityCreate}
          style={{
            borderWidth: 1,
            borderColor: '#F8F1FF',
            paddingVertical: 14,
            alignItems: 'center',
            borderRadius: 32,
            marginTop: 48,
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

const styles = StyleSheet.create({});
