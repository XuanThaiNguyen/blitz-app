import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

import colors from '../../../themes/Colors';
import {SpacingDefault} from '../../../themes/Spacing';

export const BaseBottomModalContainer = ({children, style, ...props}: ViewProps) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.medium,
    backgroundColor: colors.white,
  },
});
