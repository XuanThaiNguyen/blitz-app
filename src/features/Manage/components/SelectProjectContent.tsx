import React from 'react'
import {StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'

import {Block} from '../../../components/Block/Block'
import Button from '../../../components/Button/Button'
import Modal from '../../../components/Modal'
import {Spacer} from '../../../components/Spacer/Spacer'
import {Typo} from '../../../components/Typo/Typo'
import {useTheme} from '../../../context/ThemeProvider'
import {ProjectProps} from '../../../model/Project.props'
import {useAppSelector} from '../../../redux/hook'
import {AppState} from '../../../redux/reducer'
import colors from '../../../themes/Colors'
import images from '../../../themes/Images'

interface SelectProjectContentProps {
  onSelectProject: (item: ProjectProps | null) => void;
  selectedProject?: ProjectProps | null;
}

const SelectProjectContent = ({selectedProject, onSelectProject}: SelectProjectContentProps) => {
  const {theme} = useTheme();

  const projects = useAppSelector((_state: AppState) => _state.user.projects || []);

  const onCloseModal = () => {
    Modal.hide();
  }

  const _onSelect = (item: ProjectProps | null) => () => {
    onSelectProject?.(item);
    onCloseModal();
  };

  const renderProjectItem = (item: ProjectProps, index: number) => {
    const isLastIndex = projects?.length - 1 === index;

    return (
      <Button key={item._id} style={[styles.buttonSelect, isLastIndex ? styles.buttonLastIndex : {}]} onPress={_onSelect(item)}>
        <Block row alignCenter>
          <Block row alignCenter>
            <FastImage source={images.ic_project} style={styles.iconProject} tintColor={item.projectInfo.color} />
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
    <Block>
      <Spacer height={24} />
      <Typo text="Projects" preset="b20" color={theme.primaryText} />
      <Spacer height={32} />
      <Button style={styles.buttonSelectAll} onPress={_onSelect(null)}>
        <Block row alignCenter>
          <Block row alignCenter>
            <FastImage source={images.ic_project} style={styles.iconProject} tintColor={colors.primary} />
            <Spacer width={'small'} />
            <Typo text={'All'} color={theme.primaryText} preset="b16" />
          </Block>
        </Block>
        {!selectedProject ? (
          <FastImage source={images.ic_check} style={styles.iconCheck} tintColor={theme.primaryText} />
        ) : <></>}
      </Button>
      {projects.map(renderProjectItem)}
    </Block>
  )
}

const styles = StyleSheet.create({
  iconCheck: {
    width: 24,
    height: 24,
  },
  buttonSelect: {
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonLastIndex: {
    marginBottom: 0,
  },
  iconProject: {
    width: 16,
    height: 16
  },
  buttonSelectAll: {
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default SelectProjectContent