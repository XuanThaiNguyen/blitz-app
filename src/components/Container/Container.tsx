import React from 'react';
import {Keyboard, StyleProp, TouchableWithoutFeedback, ViewStyle} from 'react-native';

import {useTheme} from '../../context/ThemeProvider';
import {Block} from '../Block/Block';

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Container = ({children, style}: ContainerProps) => {
  const {theme} = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Block block bgColor={theme.background} styleOverride={style}>
        {children}
      </Block>
    </TouchableWithoutFeedback>
  );
};

export default Container;
