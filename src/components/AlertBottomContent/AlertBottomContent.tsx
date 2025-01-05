import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useTheme} from '../../context/ThemeProvider';
import images from '../../themes/Images';
import Button from '../Button/Button';
import Modal, {BaseBottomModalContainer} from '../Modal';
import {Spacer} from '../Spacer/Spacer';
import {Typo} from '../Typo/Typo';
import {AlertBottomContentProps, AlertErrorProps} from './AlertBottom.props';
import {ButtonProps} from '../Button/Button.props';

const AlertBottomContent = ({
  message = '',
  title = '',
  status = 'success',
  showCloseIcon = true,
  buttons = [],
  onCustomXPress,
}: AlertBottomContentProps) => {
  const {theme} = useTheme();

  let icon = images.ic_faill_cross_circle;
  switch (status) {
    case 'error':
      icon = images.ic_faill_cross_circle;
      break;
    case 'success':
      icon = images.ic_success_check_circle;
      break;
    default:
      break;
  }

  const renderButtons = () => {
    return buttons.map((button: ButtonProps, index: number) => {
      const {preset, onPress, text, loading} = button;

      const _onPressButton = () => {
        if (!loading) {
          Modal.hide();
        }
        onPress?.();
      };

      return (
        <Button key={`${index}`} preset={preset} onPress={_onPressButton} text={text} style={styles.button} />
      );
    });
  };

  return (
    <BaseBottomModalContainer showIconClose={showCloseIcon} onCustomXPress={onCustomXPress}>
      <FastImage source={icon} style={styles.icon} />
      <Spacer height={24} />
      <Typo center preset="b20" color={theme.primaryText}>{title}</Typo>
      <Spacer height={12} />
      <Typo center preset="r14" color={theme.secondaryText}>{message}</Typo>
      {buttons.length ? (
        <>
          <Spacer height={20} />
          {renderButtons()}
        </>
      ) : <></>}
    </BaseBottomModalContainer>
  );
};

export const alertBottomModal = ({
  title,
  message,
  status = 'success',
  dismissable = false,
  showCloseIcon = true,
  buttons = [],
  onCustomXPress,
}: AlertErrorProps) => {
  Modal.show({
    children: <AlertBottomContent
      buttons={buttons}
      title={title}
      message={message}
      status={status}
      showCloseIcon={showCloseIcon}
      onCustomXPress={onCustomXPress} />,
    dismissable: dismissable,
    position: 'bottom',
    onCustomXPress: onCustomXPress,
  });
};

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  button: {
    marginTop: 12,
  },
});

export default AlertBottomContent;
