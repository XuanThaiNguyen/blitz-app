import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNModal from 'react-native-modal';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {navigationRef} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';

interface SelectTagModalProps {
  tags: string[];
  onSelectTag: (item: string) => void;
  isVisible: boolean;
  onCloseModal: () => void;
}

const EmptyTag = ({onCreateTag}: {onCreateTag: () => void}) => {
  const {isDark, theme} = useTheme();
  const styles = useStyles(theme);

  return (
    <Block center>
      <FastImage source={isDark ? images.empty_dark : images.empty_light} style={styles.iconEmpty} />
      <Spacer height={12} />
      <Typo text="You have no tags right now" preset="r16" color={theme.primaryText} center />
      <Spacer height={12} />
      <Button height={44} preset="primary" text="Create Now" onPress={onCreateTag} />
      <Spacer height={16} />
    </Block>
  );
};

const SelectTagModal = ({isVisible, onCloseModal, tags, onSelectTag}: SelectTagModalProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);

  const renderTagItem = (item: string) => {
    console.log('itemmmm', item);
    return <></>;
  };

  const _onCreateTag = () => {
    onCloseModal();
    navigationRef.current?.navigate(Screen.CreateTag);
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
        <Typo text="Tags" preset="b20" color={theme.primaryText} />
        <Spacer height={32} />
        {tags?.length === 0 ? <EmptyTag onCreateTag={_onCreateTag} /> : tags.map(renderTagItem)}
        <Spacer height={16} />
      </Block>
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
    width: 32,
    height: 32,
  },
  iconCheck: {
    width: 24,
    height: 24,
  },
  iconEmpty: {
    width: 124,
    height: 124,
    alignSelf: 'center',
  },
}));

export default SelectTagModal;
