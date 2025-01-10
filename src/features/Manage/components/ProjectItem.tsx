import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {Extrapolation, interpolate, SharedValue, useAnimatedStyle} from 'react-native-reanimated';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {ProjectProps} from '../../../model/Project.props';
import {navigationRef} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';
import {ITEM_PROJECT_WIDTH, SPACING_BETWEEN_CARD} from '../constant/Constant';

interface ProjectItemProps {
  item: ProjectProps;
  index: number;
  scrollX: SharedValue<number>;
  isLastIndex?: boolean;
}

const ProjectItem = ({item, index, scrollX, isLastIndex}: ProjectItemProps) => {
  const {theme} = useTheme();
  const user = useAppSelector((_state: AppState) => _state.user.user);

  const inputRange = [(index - 1) * ITEM_PROJECT_WIDTH, index * ITEM_PROJECT_WIDTH, (index + 1) * ITEM_PROJECT_WIDTH];

  const translateStyle = useAnimatedStyle(() => {
    const translate = interpolate(scrollX.value, inputRange, [0.97, 0.97, 0.97], Extrapolation.CLAMP);
    return {
      transform: [{scale: translate}]
    };
  }, []);

  const onProjectDetail = () => {
    navigationRef.current?.navigate(Screen.ProjectDetail, {projectId: item._id});
  };

  return (
    <Animated.View style={[{
      width: ITEM_PROJECT_WIDTH,
      borderRadius: 12,
      marginLeft: index === 0 ? SPACING_BETWEEN_CARD : undefined,
      marginRight: isLastIndex ? SPACING_BETWEEN_CARD : undefined,
      overflow: 'hidden',
      backgroundColor: theme.background,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.divider,
    }, translateStyle]}>
      <Button onPress={onProjectDetail}>
        <FastImage source={images.project_cover_default} style={styles.cover} resizeMode="cover" />
        <Block paddingHorizontal={SpacingDefault.normal} pBottom={16} pTop={12}>
          <Block position="absolute" left={0} h={'200%'} w={4} bgColor={item.projectInfo.color} />
          <Block row alignCenter justifyContent="space-between">
            <FastImage source={{uri: user?.profileInfo?.avatar}} style={styles.avatar} />
            <Block row alignCenter>
              <Typo text="1" preset="r14" color={theme.secondaryText} />
              <Spacer width={'tiny'} />
              <FastImage source={images.ic_document} style={styles.icon} tintColor={theme.secondaryText} />
              <Spacer width={'small'} />
              <Typo text="2" preset="r14" color={theme.secondaryText} />
              <Spacer width={'tiny'} />
              <FastImage source={images.ic_comment} style={styles.icon} tintColor={theme.secondaryText} />
            </Block>
          </Block>
          <Spacer height={12} />
          <Typo preset="b16" color={theme.primaryText} text={`${item.projectInfo.title}`} />
          <Spacer height={16} />
          <Block w={'100%'} h={6} bgColor={theme.backgroundBox} borderRadius={100}>
            <Block position="absolute" w={'50%'} h={6} top={0} left={0} bgColor={item?.projectInfo.color} styleOverride={styles.progressBar}>
              <Block w={20} h={20} borderRadius={12} borderWidth={6} borderColor={item?.projectInfo.color} bgColor={theme.background} position="absolute" top={-8} right={-8} />
            </Block>
          </Block>
          <Spacer height={12} />
          <Block row alignCenter justifyContent="space-between">
            <Block row alignCenter>
              <FastImage source={images.ic_calendar} style={styles.icon} tintColor={theme.secondaryText} />
              <Spacer width={'smaller'} />
              <Typo preset="r14" color={theme.secondaryText} text={`${formatDate(item.createdAt, DATE_FORMAT.FIVE)}`} />
            </Block>
            <Typo text="50%" preset="b14" color={theme.primaryText} />
          </Block>
        </Block>
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  cover: {
    width: ITEM_PROJECT_WIDTH,
    height: 124
  },
  progressBar: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  }
});

export default ProjectItem;
