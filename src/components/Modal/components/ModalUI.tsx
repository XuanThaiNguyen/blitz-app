import React, {useCallback} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import RNModal from 'react-native-modal';

import {Modal} from '../Modal';
import {ModalConfig, ModalData, ModalHideParams, ModalOptions, ModalShowParams} from '../types';

export type ModalUIProps = {
  isVisible: boolean;
  options: ModalOptions;
  data: ModalData;
  show: (params: ModalShowParams) => void;
  hide: (params: ModalHideParams) => void;
  config?: ModalConfig;
  onHide: () => void;
  onCustomXPress?: () => void;
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

export const ModalUI = ({
  isVisible,
  data,
  options,
  onHide,
  config,
}: ModalUIProps) => {
  const {children} = data;
  const {style} = config || {};
  const {dismissable, position, onCustomXPress} = options;

  const onBackdropPress = useCallback(() => {
    if (dismissable) {
      if (onCustomXPress) {
        onCustomXPress?.();
      }
      Modal.hide();
    }
  }, [dismissable, onCustomXPress]);

  if (!children) {
    return null;
  }

  return (
    <RNModal
      {...RNModal.defaultProps}
      isVisible={isVisible}
      useNativeDriver
      deviceHeight={SCREEN_HEIGHT}
      deviceWidth={SCREEN_WIDTH}
      style={[modalPositionStyles[position], styles.modal, style]}
      onBackdropPress={onBackdropPress}
      avoidKeyboard={false}
      onModalHide={onHide}
      backdropOpacity={0.4}
    >
      {children}
    </RNModal>
  );
};

const modalPositionStyles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    margin: 20,
  },
  bottom: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

const styles = StyleSheet.create({
  modal: {},
});
