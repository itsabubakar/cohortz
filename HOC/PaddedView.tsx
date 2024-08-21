import React from 'react';
import {
  createRestyleComponent,
  spacing,
  SpacingProps,
} from '@shopify/restyle';
import { Theme } from '@/theme/theme';

type PaddedViewProps = React.PropsWithChildren<SpacingProps<Theme>>;

const PaddedView = createRestyleComponent<PaddedViewProps, Theme>([spacing]);

// Set the default paddingHorizontal value
PaddedView.defaultProps = {
  paddingHorizontal: 'm',
};

export default PaddedView;
