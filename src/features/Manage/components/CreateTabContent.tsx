import React from 'react'
import {StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'

import {Block} from '../../../components/Block/Block'
import Button from '../../../components/Button/Button'
import {Divider} from '../../../components/Divider/DIvider'
import Modal from '../../../components/Modal'
import {Spacer} from '../../../components/Spacer/Spacer'
import {Typo} from '../../../components/Typo/Typo'
import {useTheme} from '../../../context/ThemeProvider'
import Screen from '../../../navigation/Screen'
import {navigationRef} from '../../../navigation/navigationUtil'
import images from '../../../themes/Images'

const CreateTabContent = () => {
  const {theme} = useTheme();

  const onNavigateBySection = (screenName: Screen.CreateProject | Screen.CreateTask | Screen.CreateTag) => () => {
    Modal.hide();
    navigationRef.current?.navigate(screenName);
  }

  return (
    <Block>
      <Typo preset="b20" color={theme.primaryText}>Choose a section to create</Typo>
      <Spacer height={32} />
      <Button style={styles.section} onPress={onNavigateBySection(Screen.CreateTask)}>
        <FastImage source={images.ic_task} style={styles.icon} />
        <Spacer width={'small'} />
        <Typo preset="b16" color={theme.primaryText}>Create Task</Typo>
      </Button>
      <Spacer height={16} />
      <Divider />
      <Spacer height={16} />
      <Button style={styles.section} onPress={onNavigateBySection(Screen.CreateProject)}>
        <FastImage source={images.ic_project} style={styles.icon} />
        <Spacer width={'small'} />
        <Typo preset="b16" color={theme.primaryText}>Create Project</Typo>
      </Button>
      <Spacer height={16} />
      <Divider />
      <Spacer height={16} />
      <Button style={styles.section} onPress={onNavigateBySection(Screen.CreateTag)}>
        <FastImage source={images.ic_tag} style={styles.icon} />
        <Spacer width={'small'} />
        <Typo preset="b16" color={theme.primaryText}>Create Tag</Typo>
      </Button>
    </Block>
  )
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24
  }
})

export default CreateTabContent