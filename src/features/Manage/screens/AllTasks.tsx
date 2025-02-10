import {NavigationProp, useNavigation} from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'

import {Block} from '../../../components/Block/Block'
import Button from '../../../components/Button/Button'
import {Divider} from '../../../components/Divider/DIvider'
import Header from '../../../components/Header/Header'
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute'
import {Spacer} from '../../../components/Spacer/Spacer'
import {Typo} from '../../../components/Typo/Typo'
import {useTheme} from '../../../context/ThemeProvider'
import {ProjectProps} from '../../../model/Project.props'
import {TaskProps} from '../../../model/Task.props'
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps'
import Screen from '../../../navigation/Screen'
import {useAppSelector} from '../../../redux/hook'
import {AppState} from '../../../redux/reducer'
import {ApiStatus} from '../../../services/api/ApiStatus'
import {getTasks} from '../../../services/api/task'
import colors from '../../../themes/Colors'
import {NONE_VALUE} from '../../../themes/Constant'
import images from '../../../themes/Images'
import {SpacingDefault} from '../../../themes/Spacing'
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime'
import {isEmpty} from '../../../utils/handleUtils'
import ProgressCircle from '../components/ProgressCircle'
import {StatusTask} from '../constant/Model.props'

const AllTasks = () => {
  const {theme} = useTheme()
  const insets = useSafeAreaInsets();
  const styles = useStyles(insets);
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const user = useAppSelector((_state: AppState) => _state.user.user);
  const userProjects = useAppSelector((_state: AppState) => _state.user.projects || []);

  useEffect(() => {
    onGetTasks();
  }, [])

  const onGetTasks = async () => {
    try {
      const {data: dataTasks} = await getTasks();
      if (dataTasks?.status === ApiStatus.OK) {
        setTasks(dataTasks?.data);
      }
    } catch (err: any) {
      console.log('errr', err);
    }
  };

  const renderRight = () => {
    return (
      <Button>
        <FastImage source={images.ic_filter} style={styles.iconFilter} tintColor={theme.primaryText} />
      </Button>
    )
  }

  const onDetailTask = (item: TaskProps) => () => {
    navigate(Screen.TaskDetail, {taskId: item._id});
  }

  const renderItem = ({item}: {item: TaskProps}) => {
    const totalSubTasks = item.subTasks?.length || 0;
    const progressSubTasksByTask = item.subTasks?.filter(subTask => subTask.status === StatusTask.Done).length || 0;
    const projectOfTask = userProjects.find((_project: ProjectProps) => _project?._id === item.projectId);

    return (
      <Button onPress={onDetailTask(item)} style={[{paddingVertical: 16, paddingHorizontal: SpacingDefault.normal, borderRadius: 12, marginBottom: 12}, styles.shadow]}>
        <Block row alignCenter justifyContent="space-between">
          <Block row alignCenter>
            <Typo color={theme.primaryText} preset="b16">{item.title}</Typo>
          </Block>
          <Block bgColor={colors.secondary} pVer={2} paddingHorizontal={SpacingDefault.tiny} borderRadius={4} alignSelf="flex-start">
            <Typo preset="b14" color={colors.primary} text={`${item.priority}`} />
          </Block>
        </Block>
        <Spacer height={4} />
        <Typo preset="r14" color={theme.secondaryText} text={projectOfTask?.projectInfo.title || NONE_VALUE} />
        <Spacer height={16} />
        <Block row alignCenter justifyContent="space-between">
          <Block flex={3} row alignCenter>
            <Block block>
              <Typo text="Start Date" preset="r14" color={theme.secondaryText} />
              <Spacer height={4} />
              <Typo text={!isEmpty(item.timing.startDate) ? formatDate(item.timing.startDate, DATE_FORMAT.FIVE) : NONE_VALUE} preset="b14" color={theme.primaryText} />
            </Block>
            <Spacer width={'massive'} />
            <Block block>
              <Typo text="End Date" preset="r14" color={theme.secondaryText} />
              <Spacer height={4} />
              <Typo text={!isEmpty(item.timing.endDate) ? formatDate(item.timing.endDate, DATE_FORMAT.FIVE) : NONE_VALUE} preset="b14" color={theme.primaryText} />
            </Block>
          </Block>
          <Block flex={1} alignItems="flex-end">
            {totalSubTasks > 0 ? (
              <ProgressCircle value={progressSubTasksByTask / totalSubTasks * 100 || 0} size={112} mRight={SpacingDefault.smaller} strokeWidth={3} textPreset="b12" />
            ) : <></>}
          </Block>
        </Block>
        <Spacer height={16} />
        <Divider height={1} />
        <Spacer height={16} />
        <Block row alignCenter justifyContent="space-between">
          <Block row alignCenter>
            <Typo text={`${totalSubTasks} sub tasks`} preset="r14" color={theme.secondaryText} />
            <Spacer width={'smaller'} />
            <Block w={4} h={4} borderRadius={4} bgColor={theme.secondaryText} />
            <Spacer width={'smaller'} />
            <FastImage source={{uri: user?.profileInfo?.avatar}} style={styles.iconAvatar} />
          </Block>
          <Block bgColor={colors.secondary} pVer={4} paddingHorizontal={SpacingDefault.smaller} borderRadius={8} alignSelf="flex-start">
            <Typo preset="b16" color={colors.primary} text={`${item.status}`} />
          </Block>
        </Block>
      </Button>
    )
  }

  return (
    <Block block bgColor={theme.background}>
      <InsetSubstitute />
      <Header titleHeader="All Tasks" renderRight={renderRight} />
      <Spacer height={12} />
      <FlatList data={tasks} keyExtractor={item => item._id} renderItem={renderItem} contentContainerStyle={styles.flatlistContainer} />
    </Block>
  )
}

const useStyles = ((insets: EdgeInsets) => StyleSheet.create({
  shadow: {
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 10,
    shadowRadius: 1,
    elevation: 5
  },
  iconFilter: {
    width: 24,
    height: 24
  },
  iconAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  flatlistContainer: {
    paddingHorizontal: SpacingDefault.normal,
    paddingBottom: insets.bottom + 16,
    paddingTop: 12
  }
}))

export default AllTasks