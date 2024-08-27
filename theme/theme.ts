import { createBox, createText, createTheme } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    primary: '#5A2EA0',
    primaryDark: '#272727',
    primaryLight: '#E3DDF9',
    lightBackground: '#FFFFFF',
    text: '#2D2D2D',
    buttonText: '#FCFBFE',
    skyBlue: '#87CEEB',
    mintGreen: '#98FF98',
    lightYellow: '#fef3c7',
    lightGreen: '#bada55',
    // Add more colors as needed
  },
  spacing: {
    none: 0,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    // Add more spacing as needed
  },
  textVariants: {
    defaults: {
      fontFamily: 'DMSansRegular',
      fontSize: 14,
      color: 'text',
    },
    headerOne: {
      fontFamily: 'DMSansSemiBold',
      fontSize: 32,
      color: 'text',
    },
    headerTwo: {
      fontFamily: 'DMSansMedium',
      fontSize: 24,
      color: 'text',
    },
    subheading: {
      fontFamily: 'DMSansRegular',
      fontSize: 14,
      color: 'text',
    },
    button: {
      fontFamily: 'DMSansMedium',
      fontSize: 14,
      textAlign: 'center',
      color: 'buttonText',
      textTransform: 'uppercase',
    },
    body: {
      fontSize: 16,
      color: 'text',
    },
    s: {
      fontSize: 12,
    },
    m: {
      fontSize: 16,
    },
    l: {
      fontSize: 24,
    },
    // Add more text variants as needed
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export default theme;
