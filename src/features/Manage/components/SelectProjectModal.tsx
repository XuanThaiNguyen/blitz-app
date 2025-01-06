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
import {ProjectProps} from '../../../model/Project.props';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';

interface SelectProjectModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  projects: ProjectProps[];
  onSelectProject: (item: ProjectProps) => void;
  selectedProject: ProjectProps | null;
}

const SelectProjectModal = ({isVisible, onCloseModal, projects, onSelectProject, selectedProject}: SelectProjectModalProps) => {
  const {theme} = useTheme();
  const styles = useStyles(theme);
  const insets = useSafeAreaInsets();

  const _onSelect = (item: ProjectProps) => () => {
    onSelectProject(item);
    onCloseModal();
  };

  const renderProjectItem = (item: ProjectProps) => {
    return (
      <Button key={item._id} style={{marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} onPress={_onSelect(item)}>
        <Block row alignCenter>
          <Block row alignCenter>
            <FastImage source={images.ic_project} style={{width: 16, height: 16}} tintColor={item.projectInfo.color} />
            <Spacer width={'small'} />
            <Typo text={item.projectInfo.title} color={theme.primaryText} preset="b16" />
          </Block>
        </Block>
        {item._id === selectedProject?._id ? (
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
        <Typo text="Projects" preset="b20" color={theme.primaryText} />
        <Spacer height={32} />
        {projects.map(renderProjectItem)}
        <Spacer height={insets.bottom + 16} />
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
    width: 24,
    height: 24,
  },
  iconCheck: {
    width: 24,
    height: 24,
  },
}));

export default SelectProjectModal;
