import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaWrapper } from '@/HOC';
import { DropdownInput, Input } from '@/components/Form';
import { Header } from '@/ui';
import { Text } from '@/theme/theme';
import { BackArrowIcon } from '@/assets/icons';
import { Link } from 'expo-router';

const MoreInfo = () => {
  const options = ["Enterprenuer", "self-employed"]
  return (
    <SafeAreaWrapper>
      <View style={{ marginTop: 24 }}>
        <Header number={3} />
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
            We want to know more...
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
            We’d love to give you the best onboarding experience!
          </Text>
        </View>
        <View style={{ gap: 24 }}>
          
          <View>
            <Text style={styles.label}>Which of this sounds most like you?</Text>
            <DropdownInput />
          </View>
          <View>
            <Text style={styles.label}>What's your goal with Cohortle?</Text>
            <DropdownInput />
          </View>
          <View>
            <Text style={styles.label}>Hoiw did you hear about Cohortle?</Text>
            <DropdownInput />
          </View>
          {/* <Input label="Community URL" placeholder="muhammads-community" /> */}
        </View>
      </View>

      <Link asChild href="/community-structure">
        <Pressable
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

export default MoreInfo;

const styles = StyleSheet.create({
  
  label: {
    fontSize: 14,
    fontWeight: 700,
    color: '#391D65',
    marginBottom: 8,
  }
});
