import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {DeviceEventEmitter, ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {alertBottomModal} from '../../../components/AlertBottomContent/AlertBottomContent';
import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {ProjectProps} from '../../../model/Project.props';
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
import ManageHeader from '../components/ManageHeader';
import ProjectList from '../components/ProjectList';
import SelectProjectContent from '../components/SelectProjectContent';
import TaskItem from '../components/TaskItem';

const Manage = () => {
  const insets = useSafeAreaInsets();
  const {theme, isDark} = useTheme();
  const styles = useStyles(theme);
  const {navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: AppState) => state.user.user);

  const [currentProject, setCurrentProject] = useState<ProjectProps | null>(null);

  const [data, setData] = useState({
    projects: [],
    tasks: [],
  });

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

  const onCreate = (screenName: any) => () => {
    if (!user) {
      return showLoginModal();
    }
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

  const renderItem = (item: TaskProps) => <TaskItem key={item._id} item={item} style={styles.taskItem} />;

  const renderEmpty = () => {
    return (
      <Block center mTop={24}>
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

  const _onSelectProject = (project: ProjectProps | null) => {
    setCurrentProject(project);
  }

  const onFilterTask = () => {
    alertBottomModal({
      content: <SelectProjectContent selectedProject={currentProject} onSelectProject={_onSelectProject} />,
      dismissable: true,
    })
  }

  const onViewAllTasks = () => {
    navigate(Screen.AllTasks);
  }

  const tasksByProject = useMemo(() => {
    if (!isEmpty(currentProject)) {
      return data.tasks?.filter((item: TaskProps) => item.projectId === currentProject?._id);
    }
    return data.tasks
  }, [currentProject, data.tasks])

  return (
    <Container style={styles.container}>
      <Spacer height={insets.top + 8} />
      <ScrollView
        contentContainerStyle={styles.scrollviewContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {/* <TaskOverview tasks={data.tasks || []} /> */}
        <ManageHeader />
        <Block bgColor={theme.background}>
          <Spacer height={70 + 32} />
          <ProjectList projects={data.projects || []} />
        </Block>
        <Spacer height={16} />
        <Block paddingHorizontal={SpacingDefault.normal} row alignCenter justifyContent="space-between">
          <Typo text="Tasks" preset="b16" color={theme.primaryText} />
          <Button onPress={onFilterTask} style={styles.filterButton}>
            <Typo text={currentProject?.projectInfo?.title || 'All Projects'} preset="r14" color={theme.secondaryText} />
            <Spacer width={'smaller'} />
            <FastImage source={images.ic_arrow_down} style={styles.iconDown} tintColor={theme.secondaryText} />
          </Button>
        </Block>
        <Spacer height={12} />
        {tasksByProject?.length > 0 ? tasksByProject?.slice(0, 4).map(renderItem) : renderEmpty()}
        {tasksByProject?.length > 4 ? (
          <>
            <Button preset="primary" text="View All" onPress={onViewAllTasks} style={styles.buttonViewAll} />
            <Spacer height={32} />
          </>
        ) : <Spacer height={16} />}
      </ScrollView>
    </Container>
  );
};

const useStyles = ((theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: '#d1fae5'
  },
  scrollviewContainer: {
    backgroundColor: theme.background
  },
  filterButton: {
    borderWidth: 1,
    borderColor: theme.divider,
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: SpacingDefault.small,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconDown: {
    width: 16,
    height: 16,
  },
  taskItem: {
    marginBottom: 16,
    marginHorizontal: SpacingDefault.normal,
  },
  iconEmpty: {
    width: 124,
    height: 124,
    alignSelf: 'center',
  },
  buttonViewAll: {
    marginHorizontal: SpacingDefault.normal
  }
}));

export default Manage;
