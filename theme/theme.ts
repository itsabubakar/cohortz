import { createBox, createText, createTheme } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    primary: '#272727',
    background: '#F0F0F0',
    cardBackground: '#FFFFFF',
    text: '#1C1C1C',
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
      fontWeight: '700',
      color: 'text',
    },
    headerTwo: {
      fontFamily: 'DMSansMedium',
      fontSize: 24,
      fontWeight: '600',
      color: 'text',
    },
    subheading: {
      fontFamily: 'DMSansRegular',
      fontSize: 14,
      fontWeight: '400',
      color: 'text',
    },
    body: {
      fontSize: 16,
      color: 'text',
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
