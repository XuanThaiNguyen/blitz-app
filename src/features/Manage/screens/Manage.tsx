import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter, FlatList, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {Divider} from '../../../components/Divider/DIvider';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import {initMeasure, TOOLTIP_ADD_BUTTON_HEIGHT, TOOLTIP_ADD_BUTTON_WIDTH} from '../../../components/Tooltip/Constant';
import Tooltip from '../../../components/Tooltip/Tooltip';
import {MeasureObject} from '../../../components/Tooltip/Tooltip.prop';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {ProjectProps} from '../../../model/Project.props';
import {TaskProps} from '../../../model/Task.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {showLoginModal} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {getProjects} from '../../../services/api/project';
import {getTasks} from '../../../services/api/task';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';
import FilterTimeItem from '../components/FilterTimeItem';
import TaskItem from '../components/TaskItem';
import ProjectList from '../components/ProjectList';

const Manage = () => {
  const {theme, isDark} = useTheme();
  const styles = useStyles(theme);
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const refMeasure = useRef<any>(null);

  const user = useAppSelector((state: AppState) => state.user.user);
  const [data, setData] = useState({
    projects: [],
    tasks: [],
  });
  const [measure, setMeasure] = useState<MeasureObject>(initMeasure);
  const [showTooltip, setShowTooltip] = useState(false);

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
      }
    } catch (err: any) {
      console.log('errr', err);
    }
  };

  const renderItem = ({item}: {item: TaskProps}) => <TaskItem item={item} style={styles.taskItem} projects={data.projects} />;

  const onSearchTask = () => {
    navigate(Screen.SearchTask);
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
      </Block >
    );
  };

  return (
    <Container>
      <Block bgColor={theme.backgroundBox}>
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
            <Button style={styles.buttonSearch} onPress={onSearchTask}>
              <FastImage source={images.ic_search} style={styles.iconSearch} tintColor={theme.secondaryText} />
              <Spacer width={'small'} />
              <Typo text="Search" preset="r16" color={theme.secondaryText} />
            </Button>
            <Spacer width={'small'} />
            <Button>
              <FastImage source={images.ic_notification} style={styles.iconSearch} tintColor={theme.primaryText} />
            </Button>
          </Block>
        </Block>
        <Spacer height={32} />
        <ProjectList projects={data.projects || []} />
        <Spacer height={24} />
      </Block>
      <Block block>
        <Spacer height={12} />
        <Typo text="Tasks" preset="b14" color={theme.secondaryText} style={{marginLeft: SpacingDefault.normal}} />
        <Spacer height={12} />
        <FlatList
          contentContainerStyle={{paddingTop: 12}}
          data={data.tasks}
          ListEmptyComponent={renderEmpty}
          keyExtractor={item => item._id}
          renderItem={renderItem} />
      </Block>

      <Button style={styles.buttonAdd} onPress={onShowTooltip}>
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
      </Button>
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
    backgroundColor: theme.background,
    flex: 1,
    height: 36,
    borderRadius: 8,
    paddingHorizontal: SpacingDefault.small,
  },
  iconSearch: {
    width: 20,
    height: 20,
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
    marginHorizontal: SpacingDefault.medium,
  },
  buttonAddItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatlistContainer: {
    paddingHorizontal: SpacingDefault.medium,
  },
  iconEmpty: {
    width: 124,
    height: 124,
    alignSelf: 'center',
  },
}));

export default Manage;
