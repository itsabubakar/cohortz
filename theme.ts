// theme.ts
import { createTheme } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    primary: '##272727',
    // background: '#F0F0F0',
    // cardBackground: '#FFFFFF',
    // text: '#1C1C1C',
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
    headerOne: {
      fontFamily: 'DMSansSemiBold',
      fontSize: 32,
      fontWeight: '700',
      color: '#2D2D2D',
    },
    headerTwo: {
      fontFamily: 'DMSansMedium',
      fontSize: 24,
      fontWeight: '600',
      color: '#2D2D2D',
    },
    subheading: {
      fontFamily: 'DMSansRegular',
      fontSize: 14,
      fontWeight: '400',
      color: '#2D2D2D',
    },
    body: {
      fontSize: 16,
      color: '#2D2D2D',
    },
    // Add more text variants as needed
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export default theme;
