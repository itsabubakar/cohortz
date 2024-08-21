import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { Text, Theme } from '@/theme/theme';
import { useTheme } from '@shopify/restyle';

type Props = {
  variant?: 'primary' | 'secondary';
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>; // Optional style prop
};

const Button = ({ text, onPress, style, variant = 'primary' }: Props) => {
  const theme = useTheme<Theme>();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor:
            variant === 'secondary'
              ? pressed
                ? '#000000'
                : 'transparent'
              : pressed
                ? theme.colors.primaryDark
                : theme.colors.primary,
          padding: theme.spacing.m,
          borderRadius: 8,
        },
        style,
      ]}
    >
      {({ pressed }) => (
        <Text
          variant={'button'}
          style={{
            color:
              pressed || variant === 'primary' ? 'white' : theme.colors.primary,
          }}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
