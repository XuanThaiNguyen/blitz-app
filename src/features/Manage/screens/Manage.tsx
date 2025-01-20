import {NavigationProp, useNavigation} from '@react-navigation/native';
import throttle from 'lodash/throttle';
import React, {useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter, FlatList, LayoutChangeEvent, ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import {initMeasure} from '../../../components/Tooltip/Constant';
import {MeasureObject} from '../../../components/Tooltip/Tooltip.prop';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {TaskProps} from '../../../model/Task.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {showLoginModal} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {useAppDispatch, useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {actions as UserActions} from '../../../redux/user';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {getProjects} from '../../../services/api/project';
import {getTasks} from '../../../services/api/task';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';
import ProjectList from '../components/ProjectList';
import TaskItem from '../components/TaskItem';
import {StatusTask} from '../constant/Model.props';

const Manage = () => {
  const {theme, isDark} = useTheme();
  const styles = useStyles(theme);
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const refMeasure = useRef<any>(null);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: AppState) => state.user.user);
  const [data, setData] = useState({
    projects: [],
    tasks: [],
  });
  const [measure, setMeasure] = useState<MeasureObject>(initMeasure);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mainScrollViewHeight, setMainScrollViewHeight] = useState<number>(0);

  useEffect(() => {
    if (!isEmpty(user)) {
      onGetProjectsAndTasks();
    }
  }, [user]);

  useEffect(() => {
    const taskListener = DeviceEventEmitter.addListener(EmitterKeys.RELOAD_TASKS, onGetTasks);
    const projectListener = DeviceEventEmitter.addListener(EmitterKeys.RELOAD_PROJECTS, onGetProjects);
    return () => {
      taskListener.remove();
      projectListener.remove();
    };
  }, []);

  const onShowTooltip = () => {
    refMeasure?.current?.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        setMeasure({x, y, width, height, pageX, pageY});
        setShowTooltip(true);
      }
    );
  };

  const onCreate = (screenName: any) => () => {
    if (!user) {
      return showLoginModal();
    }
    setShowTooltip(false);
    navigate(screenName);
  };

  const onGetProjectsAndTasks = async () => {
    try {
      const [{data: dataProjects}, {data: dataTasks}] = await Promise.all([getProjects(), getTasks()]);
      if (dataProjects?.status === ApiStatus.OK && dataTasks?.status === ApiStatus.OK) {
        setData(prev => ({...prev, projects: dataProjects?.data, tasks: dataTasks?.data}));
        dispatch(UserActions.setProjects(dataProjects?.data));
      }
    } catch (err: any) {

    }
  };

  const onGetTasks = async () => {
    try {
      const {data: dataTasks} = await getTasks();
      if (dataTasks?.status === ApiStatus.OK) {
        setData(prev => ({...prev, tasks: dataTasks?.data}));
      }
    } catch (err: any) {
      console.log('errr', err);
    }
  };

  const onGetProjects = async () => {
    try {
      const {data: dataProjects} = await getProjects();
      if (dataProjects?.status === ApiStatus.OK) {
        setData(prev => ({...prev, projects: dataProjects?.data}));
        dispatch(UserActions.setProjects(dataProjects?.data));
      }
    } catch (err: any) {
      console.log('errr', err);
    }
  };

  const renderItem = ({item}: {item: TaskProps}) => <TaskItem item={item} style={styles.taskItem} projects={data.projects} />;

  const onSearchTask = (status?: StatusTask) => () => {
    navigate(Screen.SearchTask, {status, projects: data.projects});
  };

  const onLogin = () => {
    showLoginModal();
  };

  const _onClose = () => {
    setShowTooltip(false);
  };

  const renderEmpty = () => {
    return (
      <Block center>
        <FastImage source={isDark ? images.empty_dark : images.empty_light} style={styles.iconEmpty} />
        <Spacer height={12} />
        <Typo text="You have no tasks right now" preset="r16" color={theme.primaryText} center />
        <Spacer height={12} />
        <Button onPress={onCreate(Screen.CreateTask)}>
          <Typo text="Create Now" preset="b16" color={colors.primary} />
        </Button>
        <Spacer height={16} />
      </Block>
    );
  };

  const updateScrollViewHeight = throttle(
    (height: number) => {
      setMainScrollViewHeight(height);
    },
    500,
    {leading: true, trailing: true}
  );

  const _onLayoutSV = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    updateScrollViewHeight(height);
  };

  const onCreateTask = () => {
    navigate(Screen.CreateTask, {});
  }

  const onNotification = () => {
    navigate(Screen.Notification);
  }

  return (
    <Container>
      <InsetSubstitute />
      <Block h={52} row alignCenter paddingHorizontal={SpacingDefault.normal}>
        <Block row alignCenter block>
          {!isEmpty(user?.profileInfo.avatar) ? (
            <FastImage source={{uri: user?.profileInfo.avatar}} style={styles.avatarUser} resizeMode="contain" />
          ) : (
            <Button style={styles.buttonAvatar} onPress={onLogin}>
              <FastImage source={images.ic_personal} style={styles.iconAvatar} tintColor={theme.secondaryText} />
            </Button>
          )}
          <Spacer width={'small'} />
          {!isEmpty(user) ? (
            <Block block>
              <Typo text={user?.profileInfo?.fullname} preset="b16" color={theme.primaryText} />
              <Spacer height={4} />
              <Typo text="You have 4 tasks today!" preset="r14" color={theme.secondaryText} />
            </Block>
          ) : <></>}
          <Button onPress={onSearchTask()}>
            <FastImage source={images.ic_search} style={styles.iconSearch} tintColor={theme.primaryText} />
          </Button>
          <Spacer width={'small'} />
          <Button onPress={onNotification}>
            <FastImage source={images.ic_notification} style={styles.iconSearch} tintColor={theme.primaryText} />
          </Button>
        </Block>
      </Block>
      <Spacer height={16} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        onLayout={_onLayoutSV}>
        <Block paddingHorizontal={SpacingDefault.normal}>
          <Typo text="Task Overview" preset="b16" color={theme.primaryText} />
          <Spacer height={24} />
          <Block row alignCenter>
            <Button onPress={onSearchTask(StatusTask.NotStartYet)} style={[styles.blockOverview, styles.shadow]}>
              <FastImage source={images.ic_today} style={styles.iconSearch} tintColor={theme.primaryText} />
              <Spacer height={12} />
              <Typo text="10 Tasks" preset="b16" color={theme.primaryText} />
              <Spacer height={4} />
              <Typo text="To do" preset="r14" color={theme.secondaryText} />
            </Button>
            <Spacer width={'small'} />
            <Button onPress={onSearchTask(StatusTask.Pending)} style={[styles.blockOverview, styles.shadow]}>
              <FastImage source={images.ic_faill_cross_circle} style={styles.iconSearch} tintColor={theme.primaryText} />
              <Spacer height={12} />
              <Typo text="10 Tasks" preset="b16" color={theme.primaryText} />
              <Spacer height={4} />
              <Typo text="Pending" preset="r14" color={theme.secondaryText} />
            </Button>
          </Block>
          <Spacer height={16} />
          <Block row alignCenter>
            <Button onPress={onSearchTask(StatusTask.InProgress)} style={[styles.blockOverview, styles.shadow]}>
              <FastImage source={images.ic_planned} style={styles.iconSearch} tintColor={theme.primaryText} />
              <Spacer height={12} />
              <Typo text="10 Tasks" preset="b16" color={theme.primaryText} />
              <Spacer height={4} />
              <Typo text="In Progress" preset="r14" color={theme.secondaryText} />
            </Button>
            <Spacer width={'small'} />
            <Button onPress={onSearchTask(StatusTask.Done)} style={[styles.blockOverview, styles.shadow]}>
              <FastImage source={images.ic_success_check_circle} style={styles.iconSearch} tintColor={theme.primaryText} />
              <Spacer height={12} />
              <Typo text="10 Tasks" preset="b16" color={theme.primaryText} />
              <Spacer height={4} />
              <Typo text="Completed" preset="r14" color={theme.secondaryText} />
            </Button>
          </Block>
          <Spacer height={24} />
        </Block>
        <Block bgColor={theme.backgroundBox}>
          <Spacer height={16} />
          <ProjectList projects={data.projects || []} />
          <Spacer height={24} />
        </Block>
        <Block h={mainScrollViewHeight}>
          <Block block>
            <Spacer height={12} />
            <Block paddingHorizontal={SpacingDefault.normal} row alignCenter justifyContent="space-between">
              <Typo text="Tasks" preset="b16" color={theme.primaryText} />
              <Button onPress={onCreateTask} style={{flexDirection: 'row', alignItems: 'center'}}>
                <FastImage source={images.ic_close} style={{width: 12, height: 12, transform: [{rotate: '45deg'}]}} tintColor={colors.primary} />
                <Spacer width={'tiny'} />
                <Typo text="Add new" preset="r14" color={colors.primary} />
              </Button>
            </Block>
            <Spacer height={12} />
            <FlatList
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              bounces={false}
              contentContainerStyle={styles.flatlistContainer}
              data={data.tasks}
              ListEmptyComponent={renderEmpty}
              keyExtractor={item => item._id}
              renderItem={renderItem} />
          </Block>
        </Block>
      </ScrollView>

      {/* <Button style={styles.buttonAdd} onPress={onShowTooltip}>
        <Block ref={refMeasure}>
          <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={colors.white} />
          {measure ? (
            <Tooltip
              isVisible={!!showTooltip}
              onClose={_onClose}
              wrapperStyle={{
                top: measure.height + measure.pageY - (ADD_BUTTON_HEIGHT * 2) - TOOLTIP_ADD_BUTTON_HEIGHT - 8, //8: Spacing
                width: TOOLTIP_ADD_BUTTON_WIDTH,
                borderRadius: 6,
                left: SpacingDefault.width - SpacingDefault.medium * 2 - 140,
              }}
            >
              <Block paddingHorizontal={SpacingDefault.normal} pVer={12}>
                <Button style={styles.buttonAddItem} onPress={onCreate(Screen.CreateProject)}>
                  <FastImage source={images.ic_project} style={styles.icon} tintColor={colors.red} />
                  <Spacer width={'small'} />
                  <Typo
                    color={theme.primaryText}
                    preset="b16"
                    text={'Project'} />
                </Button>
                <Spacer height={12} />
                <Divider height={StyleSheet.hairlineWidth} width={'100%'} color={theme.divider} />
                <Spacer height={12} />
                <Button style={styles.buttonAddItem} onPress={onCreate(Screen.CreateTask)}>
                  <FastImage source={images.ic_task} style={styles.icon} tintColor={colors.red} />
                  <Spacer width={'small'} />
                  <Typo
                    color={theme.primaryText}
                    preset="b16"
                    text={'Task'} />
                </Button>
                <Spacer height={12} />
                <Divider height={StyleSheet.hairlineWidth} width={'100%'} color={theme.divider} />
                <Spacer height={12} />
                <Button style={styles.buttonAddItem} onPress={onCreate(Screen.CreateTag)}>
                  <FastImage source={images.ic_tag} style={styles.icon} tintColor={colors.red} />
                  <Spacer width={'small'} />
                  <Typo
                    color={theme.primaryText}
                    preset="b16"
                    text={'Tag'} />
                </Button>
              </Block>
            </Tooltip>
          ) : <></>
          }
        </Block>
      </Button> */}
    </Container>
  );
};

const ADD_BUTTON_HEIGHT = 36;

const useStyles = ((theme: Theme) => StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  avatarUser: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  buttonAdd: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 16,
    right: SpacingDefault.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAdd: {
    width: ADD_BUTTON_HEIGHT,
    height: ADD_BUTTON_HEIGHT,
  },
  buttonSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.backgroundBox,
    flex: 1,
    height: 36,
    borderRadius: 8,
    paddingHorizontal: SpacingDefault.small,
  },
  iconSearch: {
    width: 24,
    height: 24,
  },
  buttonAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.secondaryText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAvatar: {
    width: 24,
    height: 24,
  },
  taskItem: {
    marginBottom: 16,
    marginHorizontal: SpacingDefault.normal,
  },
  buttonAddItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconEmpty: {
    width: 124,
    height: 124,
    alignSelf: 'center',
  },
  flatlistContainer: {
    paddingTop: 12,
    paddingBottom: 16
  },
  shadow: {
    backgroundColor: theme.background,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: {
      width: 1,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5
  },
  blockOverview:
  {
    borderWidth: 1,
    borderColor: theme.divider,
    paddingVertical: 16,
    paddingHorizontal: SpacingDefault.normal,
    flex: 1,
    borderRadius: 12
  }
}));

export default Manage;
