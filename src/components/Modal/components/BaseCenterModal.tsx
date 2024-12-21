import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

import colors from '../../../themes/Colors';

export const BaseCenterModalContainer = ({children, style, ...props}: ViewProps) => {
  return (
    <View style={StyleSheet.compose(styles.container, style)} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
  },
});
