import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNModal from 'react-native-modal';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {PRIORITIES} from '../constant/Constant';
import {PriorityProps} from '../constant/Model.props';

interface SelectPriorityModalProps {
  priority: PriorityProps;
  onSelectPriority: (item: PriorityProps) => void;
  isVisible: boolean;
  onCloseModal: () => void;
}

const SelectPriorityModal = ({priority, onSelectPriority, isVisible, onCloseModal}: SelectPriorityModalProps) => {
  const {theme} = useTheme();

  const _onSelect = (item: PriorityProps) => () => {
    onSelectPriority(item);
    onCloseModal();
  };

  const renderPriorityItem = (item: PriorityProps) => {
    return (
      <Button key={item.key} style={styles.buttonItem} onPress={_onSelect(item)}>
        <Block row alignCenter>
          <Block center w={48} h={48} bgColor={item.color} borderRadius={24}>
            <FastImage source={images.ic_today} style={styles.iconFlag} tintColor={colors.white} />
          </Block>
          <Spacer width={'smaller'} />
          <Typo text={item.value} color={item.key === priority.key ? theme.primaryText : theme.secondaryText} preset={item.key === priority.key ? 'sb16' : 'r16'} />
        </Block>
        {item.key === priority.key ? (
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
      <Block style={styles.block}>
        <Spacer height={32} />
        <Button onPress={onCloseModal} style={styles.buttonClose}>
          <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.primaryText} />
        </Button>
        <Spacer height={24} />
        <Typo text="Priority" preset="sb20" color={theme.primaryText} />
        <Spacer height={24} />
        {PRIORITIES.map(renderPriorityItem)}
        <Spacer height={16} />
      </Block>
    </RNModal>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: colors.white,
    paddingHorizontal: SpacingDefault.medium,
  },
  buttonItem: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconFlag: {
    width: 32,
    height: 32,
  },
  iconCheck: {
    width: 24,
    height: 24,
  },
});

export default SelectPriorityModal;
