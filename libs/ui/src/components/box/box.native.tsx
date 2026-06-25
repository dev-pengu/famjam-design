import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { View } from 'react-native';

import { BoxVariant, type BoxProps } from './box.types';
import { styles } from './box.native.styles';

export { BoxVariant };

const VARIANT_STYLE: Record<BoxVariant, StyleProp<ViewStyle>> = {
  [BoxVariant.Left]: styles.left,
  [BoxVariant.Center]: styles.center,
  [BoxVariant.Right]: styles.right,
};

export const Box = ({ children, variant = BoxVariant.Center, style, ...props }: Readonly<BoxProps & ViewProps>) => {
  const alignmentStyle = VARIANT_STYLE[variant];

  return (
    <View
      style={[styles.root, alignmentStyle, style]}
      {...props}
    >
      {children}
    </View>
  );
};
