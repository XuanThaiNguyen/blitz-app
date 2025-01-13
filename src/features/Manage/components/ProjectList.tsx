import React from 'react'
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native'
import Animated, {useSharedValue} from 'react-native-reanimated'

import {Block} from '../../../components/Block/Block'
import {Spacer} from '../../../components/Spacer/Spacer'
import {Typo} from '../../../components/Typo/Typo'
import {useTheme} from '../../../context/ThemeProvider'
import {ProjectProps} from '../../../model/Project.props'
import {SpacingDefault} from '../../../themes/Spacing'
import {ITEM_PROJECT_WIDTH} from '../constant/Constant'
import ProjectItem from './ProjectItem'
import Button from '../../../components/Button/Button'
import colors from '../../../themes/Colors'
import {navigationRef} from '../../../navigation/navigationUtil'
import Screen from '../../../navigation/Screen'
import FastImage from 'react-native-fast-image'
import images from '../../../themes/Images'

interface ProjectListProps {
  projects: ProjectProps[];
}

const ProjectList = ({projects}: ProjectListProps) => {
  const {theme} = useTheme();
  const scrollX = useSharedValue(0);

  const _onScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const renderProjectItem = (item: ProjectProps, index: number) => <ProjectItem key={item._id} item={item} index={index} isLastIndex={projects.length - 1 === index} scrollX={scrollX} />;

  const onCreateProject = () => {
    navigationRef.current?.navigate(Screen.CreateProject);
  }

  return (
    <Block>
      <Block row alignCenter justifyContent="space-between" paddingHorizontal={SpacingDefault.normal}>
        <Typo text="Your projects" preset="b16" color={theme.primaryText} />
        <Button onPress={onCreateProject} style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage source={images.ic_close} style={{width: 12, height: 12, transform: [{rotate: '45deg'}]}} tintColor={colors.primary} />
          <Spacer width={'tiny'} />
          <Typo text="Add new" preset="r14" color={colors.primary} />
        </Button>
      </Block>
      <Spacer height={16} />
      <Animated.ScrollView
        horizontal
        decelerationRate={'fast'}
        snapToInterval={ITEM_PROJECT_WIDTH}
        disableIntervalMomentum
        scrollEventThrottle={16}
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={_onScrollHandler}>
        {projects?.map(renderProjectItem)}
      </Animated.ScrollView>
    </Block>
  )
}

export default ProjectList