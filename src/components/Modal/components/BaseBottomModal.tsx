import React, {useContext} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ThemeContext} from '../../../context/ThemeProvider';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {Block} from '../../Block/Block';
import Button from '../../Button/Button';
import {Spacer} from '../../Spacer/Spacer';
import {Modal} from '../Modal';

interface BaseBottomModalContainerProps {
  children: React.ReactNode;
  showIconClose?: boolean;
  style?: StyleProp<ViewStyle>;
  onCustomXPress?: () => void;
}

export const BaseBottomModalContainer = ({children, onCustomXPress, showIconClose, style, ...props}: BaseBottomModalContainerProps) => {
  const {theme} = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  const _onClose = () => {
    if (onCustomXPress) {
      onCustomXPress?.();
    }
    Modal.hide();
  };

  return (
    <Block styleOverride={[styles.container, style]} {...props}>
      {showIconClose ? (
        <>
          <Spacer height={32} />
          <Button style={styles.buttonClose} onPress={_onClose}>
            <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.primaryText} />
          </Button>
        </>
      ) : <Spacer height={12} />}
      <Spacer height={24} />
      {children}
      <Spacer height={insets.bottom + 16} />
    </Block >
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.medium,
    backgroundColor: colors.white,
  },
  buttonClose: {
    alignSelf: 'flex-end',
  },
  iconClose: {
    width: 24,
    height: 24,
  },
});
