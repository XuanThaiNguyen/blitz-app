import {NavigationProp, RouteProp, StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, FlatList, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {Divider} from '../../../components/Divider/DIvider';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {Spacer} from '../../../components/Spacer/Spacer';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {ProjectProps} from '../../../model/Project.props';
import {TaskProps} from '../../../model/Task.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {getProjectDetailById, updateProjectById} from '../../../services/api/project';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';
import {isEmpty} from '../../../utils/handleUtils';
import TaskItem from '../components/TaskItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import {showSnack} from '../../../components/SnackBar';
import AddDescriptionModal from '../components/AddDescriptionModal';
import {navigationRef} from '../../../navigation/navigationUtil';

const ProjectDetail = () => {
  const {dispatch, navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.ProjectDetail>>();
  const {times = 1, projectId = ''} = route.params;
  const popActions = StackActions.pop(times);
  const {theme, isDark} = useTheme();
  const insets = useSafeAreaInsets();

  const user = useAppSelector((_state: AppState) => _state.user.user);

  const [project, setProject] = useState<ProjectProps | null>(null);
  const [isDescVisible, setIsDescVisible] = useState(false);

  const openDescModal = () => setIsDescVisible(true);
  const closeDescModal = () => setIsDescVisible(false);

  const onBack = () => dispatch(popActions);

  useEffect(() => {
    if (!isEmpty(projectId)) {
      onGetProjectDetailById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const onGetProjectDetailById = async () => {
    try {
      const {data} = await getProjectDetailById(projectId);
      if (data.status === ApiStatus.OK) {
        setProject(data.data);
      }
    } catch (err) {

    }
  };

  const onCreateNewTask = () => {
    navigationRef.current?.navigate(Screen.CreateTask, {projectId: project?._id, isHide: true});
  }

  const renderEmpty = () => {
    return (
      <Block center>
        <FastImage source={isDark ? images.empty_dark : images.empty_light} style={styles.iconEmpty} />
        <Spacer height={12} />
        <Typo text="You have no tasks right now" preset="r16" color={theme.primaryText} center />
        <Spacer height={12} />
        <Button onPress={onCreateNewTask}>
          <Typo text="Create Now" preset="b16" color={colors.primary} />
        </Button>
        <Spacer height={16} />
      </Block >
    );
  };

  const onUpdateTask = async (params: any) => {
    try {
      const {data} = await updateProjectById(projectId, params);
      if (data.status === ApiStatus.OK && !isEmpty(data.data)) {
        setProject(data.data);
        setTimeout(() => {
          DeviceEventEmitter.emit(EmitterKeys.RELOAD_PROJECTS);
          showSnack({msg: 'Update Project Successfully', type: 'success', position: 'top_under_header'});
        }, 500);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const renderTaskItem = ({item, index}: {item: TaskProps, index: number}) => <TaskItem item={item} style={styles.taskItem} projects={[]} project={project} onCustomPress={() => { }} />;

  if (isEmpty(project)) return <></>;

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Project Detail" onPressLeft={onBack} />
      <FastImage source={images.project_cover_default} style={styles.cover} resizeMode="cover" />
      <Spacer height={16} />
      <Block paddingHorizontal={SpacingDefault.medium}>
        <Typo text={project?.projectInfo.title || ''} preset="b16" color={theme.primaryText} />
        <Spacer height={12} />
        <Block row alignCenter>
          <FastImage source={images.ic_calendar} style={styles.icon} tintColor={theme.secondaryText} />
          <Spacer width={'smaller'} />
          <Typo text={formatDate(project?.createdAt!, DATE_FORMAT.FIVE)} preset="r14" color={theme.primaryText} />
        </Block>
        <Spacer height={8} />
        <Block row alignCenter>
          <FastImage source={images.ic_members} style={styles.icon} tintColor={theme.secondaryText} />
          <Spacer width={'smaller'} />
          <FastImage source={{uri: user?.profileInfo?.avatar}} style={styles.avatar} />
        </Block>
        <Spacer height={8} />
        <Block row alignCenter>
          <FastImage source={images.ic_document} style={styles.icon} tintColor={theme.secondaryText} />
          <Spacer width={'smaller'} />
          {project?.projectInfo.description ? (
            <Typo text={project?.projectInfo.description} preset="r14" color={theme.primaryText} />
          ) : (
            <Typo text="Add description" preset="b14" color={colors.primary} suppressHighlighting onPress={openDescModal} />
          )}
        </Block>
      </Block>
      <Spacer height={16} />
      <Divider height={1} />
      <Spacer height={16} />
      <Block paddingHorizontal={SpacingDefault.medium}>
        <Block row alignCenter justifyContent="space-between">
          <Typo text="Progress" preset="b16" color={theme.primaryText} />
          <Typo text="50%" preset="r16" color={theme.primaryText} />
        </Block>
        <Spacer height={16} />
        <Block w={'100%'} h={6} bgColor={theme.backgroundBox} borderRadius={100}>
          <Block position="absolute" w={'50%'} h={6} top={0} left={0} bgColor={project?.projectInfo.color} styleOverride={styles.progressBar}>
            <Block w={20} h={20} borderRadius={12} borderWidth={6} borderColor={project?.projectInfo.color} bgColor={theme.background} position="absolute" top={-8} right={-8} />
          </Block>
        </Block>
      </Block>
      <Spacer height={16} />
      <Divider height={1} />
      <Spacer height={16} />
      <Block block paddingHorizontal={SpacingDefault.medium}>
        <Block row alignCenter justifyContent="space-between">
          <Typo text="Task" preset="b16" color={theme.primaryText} />
          {project?.tasks?.length === 0 ? <></> : (
            <Button style={styles.buttonAdd} onPress={onCreateNewTask}>
              <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={colors.primary} />
              <Spacer width={'tiny'} />
              <Typo text="Add new" preset="r14" color={colors.primary} />
            </Button>
          )}
        </Block>
        <Spacer height={16} />
        <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 16}} data={project?.tasks || []} keyExtractor={item => item._id} renderItem={renderTaskItem} ListEmptyComponent={renderEmpty} />
      </Block>

      <AddDescriptionModal
        currentDesc={project?.projectInfo?.description || ''}
        isVisible={isDescVisible}
        onCloseModal={closeDescModal}
        onAddDesc={(_desc: string) => onUpdateTask({description: _desc})} />
    </Container>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  },
  iconAdd: {
    width: 16,
    height: 16
  },
  buttonAdd: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cover: {
    width: SpacingDefault.width,
    height: 124
  },
  taskItem: {
    marginBottom: 16
  },
  icon: {
    width: 20,
    height: 20
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 12
  },
  iconEmpty: {
    width: 124,
    height: 124,
    alignSelf: 'center',
  },
});

export default ProjectDetail;
