import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNModal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {STATUSES} from '../constant/Constant';
import {StatusProps, StatusTask} from '../constant/Model.props';

interface SelectStatusModalProps {
  status: StatusTask;
  onSelectStatus: (item: StatusTask) => void;
  isVisible: boolean;
  onCloseModal: () => void;
}

const SelectStatusModal = ({status, onSelectStatus, isVisible, onCloseModal}: SelectStatusModalProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const insets = useSafeAreaInsets();

  const _onSelect = (item: StatusProps) => () => {
    onSelectStatus(item.key);
    onCloseModal();
  };

  const renderStatusItem = (item: StatusProps) => {
    return (
      <Button key={item.key} style={styles.buttonItem} onPress={_onSelect(item)}>
        <Typo text={item.value} color={item.key === status ? theme.primaryText : theme.secondaryText} preset={item.key === status ? 'b14' : 'r14'} />
        {item.key === status ? (
          <FastImage source={images.ic_check} style={styles.iconCheck} tintColor={theme.primaryText} />
        ) : <></>}
      </Button>
    );
  };

  return (
    <RNModal
      {...RNModal.defaultProps}
      isVisible={isVisible}
      useNativeDriver
      deviceHeight={SpacingDefault.height}
      deviceWidth={SpacingDefault.width}
      style={styles.modal}
      onBackdropPress={onCloseModal}
      avoidKeyboard={false}
      onModalHide={onCloseModal}
      backdropOpacity={0.4}
    >
      {!!isVisible ? (
        <Block style={styles.block}>
          <Spacer height={32} />
          <Button onPress={onCloseModal} style={styles.buttonClose}>
            <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.primaryText} />
          </Button>
          <Spacer height={24} />
          <Typo text="Status" preset="b20" color={theme.primaryText} />
          <Spacer height={32} />
          {STATUSES.map(renderStatusItem)}
          <Spacer height={insets.bottom + 16} />
        </Block>
      ) : <></>}
    </RNModal>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonClose: {
    alignItems: 'flex-end',
  },
  iconClose: {
    width: 24,
    height: 24,
  },
  block: {
    backgroundColor: theme.background,
    paddingHorizontal: SpacingDefault.medium,
  },
  buttonItem: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconFlag: {
    width: 24,
    height: 24,
  },
  iconCheck: {
    width: 24,
    height: 24,
  },
}));

export default SelectStatusModal;
