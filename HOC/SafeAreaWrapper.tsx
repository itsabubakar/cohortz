import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  // StyleProp,
  // ViewStyle,
} from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>; // Optional style prop
};

const SafeAreaWrapper = ({ children, style }: Props) => {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: 'white' }, style]}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
