import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import RNModal from 'react-native-modal';

import {useTheme} from '../../context/ThemeProvider';
import {SpacingDefault} from '../../themes/Spacing';
import {Block} from '../Block/Block';

interface TooltipProps {
  isVisible: boolean;
  children: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  onClose: () => void;
}

const Tooltip = ({children, isVisible, wrapperStyle, onClose}: TooltipProps) => {
  const {theme} = useTheme();

  return (
    <RNModal
      {...RNModal.defaultProps}
      isVisible={isVisible}
      useNativeDriver
      animationIn="fadeIn"
      animationOut="fadeOut"
      deviceHeight={SpacingDefault.height}
      deviceWidth={SpacingDefault.width}
      onBackdropPress={onClose}
      avoidKeyboard={false}
      onModalHide={onClose}
      backdropOpacity={0.4}
    >
      <Block w={'100%'} h={'100%'}>
        <Pressable
          style={[{backgroundColor: theme.backgroundBox}, wrapperStyle]}>
          {children}
        </Pressable>
      </Block>
    </RNModal>
  );
};
export default Tooltip;
