import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaWrapper } from '@/HOC';
import { DropdownInput, Input } from '@/components/Form';
import { Header } from '@/ui';
import { Text } from '@/theme/theme';
import { BackArrowIcon } from '@/assets/icons';
import { Link } from 'expo-router';

const Structure = () => {
    const [selected, setSelected] = useState<number | null>(null)

    const handleSelected = (n: number) => {
        setSelected(0)
        setSelected(prevSelected => prevSelected === n ? null : n)
    }
  return (
    <SafeAreaWrapper>
        <View style={{ marginTop: 24 }}>
            <Header number={4} />
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
                Pick your community structure
            </Text>
        </View>
        <View style={{ gap: 24 }}>
            <TouchableOpacity
            onPress={() => { handleSelected(1)}}
                style={[selected === 1 ? {backgroundColor: "red"} : {backgroundColor: ""} , { width: 152, height: 48, borderWidth: 1, borderColor: "#F8F1FF", borderRadius: 50, justifyContent:"center", alignItems:"center"}]}>
                <Text style={{fontWeight: 700, fontSize: 16}} >Hello</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => { handleSelected(2)}}
             
             style={[selected === 2 ? {backgroundColor: "red"} : {backgroundColor: ""} , { width: 152, height: 48, borderWidth: 1, borderColor: "#F8F1FF", borderRadius: 50, justifyContent:"center", alignItems:"center"}]}>
                <Text style={{fontWeight: 700, fontSize: 16}} >Hello</Text>
            </TouchableOpacity>
          {/* <Input label="Community URL" placeholder="muhammads-community" /> */}
        </View>
      </View>

      <Link asChild href="/convener-screens">
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

export default Structure;

const styles = StyleSheet.create({
  
  label: {
    fontSize: 14,
    fontWeight: 700,
    color: '#391D65',
    marginBottom: 8,
  }
});
