import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {useTheme} from '../../context/ThemeProvider';
import {DividerProps} from './Divider.props';

const DividerComponent = (props: DividerProps) => {
  const {theme} = useTheme();

  // state
  const {
    height = StyleSheet.hairlineWidth,
    width = '100%',
    color = theme.divider,
  } = props;

  // style
  const divider = useMemo<ViewStyle>(
    () => ({
      width,
      //@ts-ignore
      height,
      backgroundColor: color,
    }),
    [color, height, width],
  );

  // render
  return <View style={[divider]} />;
};
export const Divider = memo(DividerComponent, equals);
