import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNModal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextField from '../../../components/TextField/TextField';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, ThemeContext} from '../../../context/ThemeProvider';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';

interface AddDescriptionModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  currentDesc?: string;
  onAddDesc: (desc: string) => void;
}

const AddDescriptionModal = ({isVisible, onCloseModal, currentDesc = '', onAddDesc}: AddDescriptionModalProps) => {
  const insets = useSafeAreaInsets();
  const {theme} = useContext(ThemeContext);
  const styles = useStyles(theme);

  const [description, setDescription] = useState<string>(currentDesc);

  const _onAddDesc = () => {
    onCloseModal();
    onAddDesc(description);
  }

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
          <Typo text="Add description" preset="b20" color={theme.primaryText} />
          <Spacer height={32} />
          <Typo text="Description" preset="r14" color={theme.primaryText} />
          <Spacer height={8} />
          <TextField value={description} onChangeText={setDescription} placeholder="Enter task description here..." multiline inputHeight={80} blockInputStyle={{alignItems: 'flex-start', paddingTop: 8}} />
          <Spacer height={32} />
          <Button preset="primary" text="Add" disabled={description === currentDesc} onPress={_onAddDesc} />
          <Spacer height={insets.bottom + 16} />
        </Block>
      ) : <></>}
    </RNModal>
  )
}

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
}));

export default AddDescriptionModal