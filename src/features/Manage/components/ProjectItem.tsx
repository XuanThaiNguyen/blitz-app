import React, {useMemo} from 'react';
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
import {User} from '../../../redux/user';
import colors from '../../../themes/Colors';
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

  const allMembers = useMemo(() => {
    let _members: any[] = [];
    _members.push(item?.participantInfo.owner!);

    if (item?.participantInfo && item?.participantInfo?.members?.length > 0) {
      _members = [..._members, ...item?.participantInfo?.members];
    }

    return _members
  }, [item?.participantInfo])

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

  const renderMember = (item: User, index: number) => {
    return (
      <Block key={`${item._id}-${index}`} row alignCenter justifyContent="space-between">
        <FastImage source={{uri: item?.profileInfo?.avatar}} style={styles.avatarMember} />
      </Block>
    )
  }

  return (
    <Animated.View style={[{
      width: ITEM_PROJECT_WIDTH,
      borderRadius: 12,
      marginLeft: index === 0 ? SPACING_BETWEEN_CARD : undefined,
      marginRight: isLastIndex ? SPACING_BETWEEN_CARD : undefined,
      overflow: 'hidden',
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.divider,
    }, translateStyle]}>
      <Button onPress={onProjectDetail}>
        <Block>
          <FastImage source={images.project_cover_default} style={styles.cover} resizeMode="cover" />
          <Block position="absolute" top={16} left={16} row alignCenter>
            {allMembers?.map(renderMember)}
          </Block>
        </Block>
        <Block paddingHorizontal={SpacingDefault.normal} pBottom={16} pTop={12}>
          <Block position="absolute" left={0} h={'200%'} w={4} bgColor={item.projectInfo.color} />
          <Block row alignCenter justifyContent="space-between">
          </Block>
          <Block row alignCenter justifyContent="space-between">
            <Typo preset="b16" color={theme.primaryText} text={`${item.projectInfo.title}`} />
            <Block bgColor={colors.secondary} pVer={4} paddingHorizontal={SpacingDefault.smaller} borderRadius={4}>
              <Typo preset="b16" color={colors.primary} text={`${item.projectInfo.status}`} />
            </Block>
          </Block>
          <Spacer height={4} />
          <Typo preset="r14" color={theme.secondaryText} text={item?.projectInfo?.description ? `${item?.projectInfo?.description}` : ''} numberOfLines={1} />
          <Spacer height={16} />
          <Block w={'100%'} h={6} bgColor={theme.backgroundBox} borderRadius={100}>
            <Block position="absolute" w={'50%'} h={6} top={0} left={0} bgColor={item?.projectInfo.color} styleOverride={styles.progressBar}>
              <Block w={20} h={20} borderRadius={12} borderWidth={6} borderColor={item?.projectInfo.color} bgColor={theme.background} position="absolute" top={-8} right={-8} />
            </Block>
          </Block>
          <Spacer height={16} />
          <Block row alignCenter justifyContent="space-between">
            <Block row alignCenter>
              <FastImage source={images.ic_calendar} style={styles.icon} tintColor={theme.secondaryText} />
              <Spacer width={'smaller'} />
              <Typo preset="r14" color={theme.secondaryText}>{`Created by `}<Typo preset="b14" color={theme.primaryText}>{`${formatDate(item.createdAt, DATE_FORMAT.FIVE)}`}</Typo></Typo>
            </Block>
            <Typo text="50%" preset="b14" color={theme.primaryText} />
          </Block>
        </Block>
      </Button>
    </Animated.View>
  );
};

const AVATAR_SIZE = 40;

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20
  },
  cover: {
    width: ITEM_PROJECT_WIDTH,
    height: 124
  },
  progressBar: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  },
  avatarMember: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: -AVATAR_SIZE / 2
  }
});

export default ProjectItem;
