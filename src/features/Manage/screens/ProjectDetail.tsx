import {NavigationProp, RouteProp, StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {DeviceEventEmitter, FlatList, LayoutChangeEvent, ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {throttle} from 'lodash';

import {alertBottomModal} from '../../../components/AlertBottomContent/AlertBottomContent';
import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {Divider} from '../../../components/Divider/DIvider';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import Modal from '../../../components/Modal';
import {showSnack} from '../../../components/SnackBar';
import {Spacer} from '../../../components/Spacer/Spacer';
import TextShowMore from '../../../components/TextShowMore/TextShowMore';
import {initMeasure, TOOLTIP_TASK_DETAIL_HEADER_WIDTH} from '../../../components/Tooltip/Constant';
import Tooltip from '../../../components/Tooltip/Tooltip';
import {MeasureObject} from '../../../components/Tooltip/Tooltip.prop';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {ProjectProps} from '../../../model/Project.props';
import {TaskProps} from '../../../model/Task.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {navigationRef, reset} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {User} from '../../../redux/user';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {deleteProjectById, getProjectDetailById, updateProjectById} from '../../../services/api/project';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';
import AddDescriptionModal from '../components/AddDescriptionModal';
import AddMemberModal from '../components/AddMemberModal';
import TaskItem from '../components/TaskItem';
import {StatusTask} from '../constant/Model.props';

const ProjectDetail = () => {
  const {dispatch} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.ProjectDetail>>();
  const {times = 1, projectId = ''} = route.params;
  const popActions = StackActions.pop(times);
  const {theme, isDark} = useTheme();
  const refMeasure = useRef<any>(null);

  const user = useAppSelector((_state: AppState) => _state.user.user);

  const [project, setProject] = useState<ProjectProps | null>(null);

  const [isDescVisible, setIsDescVisible] = useState(false);
  const [isMemberVisible, setIsMemberVisible] = useState(false);

  const [measure, setMeasure] = useState<MeasureObject>(initMeasure);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mainScrollViewHeight, setMainScrollViewHeight] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const openDescModal = () => setIsDescVisible(true);
  const closeDescModal = () => setIsDescVisible(false);

  const openMemberModal = () => setIsMemberVisible(true);
  const closeMemberModal = () => setIsMemberVisible(false);

  const taskDone = project?.tasks?.filter(task => task.status === StatusTask.Done);
  const taskDoneByPercent = taskDone?.length && project?.tasks?.length ? Math.ceil(taskDone?.length / project?.tasks?.length) : 0;

  const allMembers = useMemo(() => {
    let _members: any[] = [];
    _members.push(project?.participantInfo.owner!);

    if (project?.participantInfo && project?.participantInfo?.members?.length > 0) {
      _members = [..._members, ...project?.participantInfo?.members];
    }

    return _members
  }, [project?.participantInfo])

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
    navigationRef.current?.navigate(Screen.CreateTask, {projectId: project?._id});
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const renderTaskItem = ({item, index}: {item: TaskProps, index: number}) => <TaskItem item={item} style={styles.taskItem} project={project} onCustomPress={() => { }} />;

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

  const _onClose = () => {
    setShowTooltip(false);
  };

  const onConfirmDeleteTask = async () => {
    setLoading(true);
    try {
      const {data} = await deleteProjectById(project?._id!);
      if (data.status === ApiStatus.OK) {
        Modal.hide();
        setTimeout(() => {
          alertBottomModal({
            title: 'Success',
            message: 'Delete Project Successfully',
            status: 'success',
            dismissable: true,
            onCustomXPress: () => {
              reset(Screen.MainTab);
              DeviceEventEmitter.emit(EmitterKeys.RELOAD_TASKS);
            },
          });
        }, 500);
      }
    } catch (err) {

    } finally {
      setLoading(false);
    }
  }

  const onEditProject = () => { }
  const onDeleteProject = async () => {
    setShowTooltip(false);
    setTimeout(() => {
      alertBottomModal({
        title: 'Delete Project',
        message: 'Are you sure you want to delete this project?',
        status: 'error',
        dismissable: true,
        buttons: [
          {
            text: 'Delete',
            preset: 'primary',
            onPress: onConfirmDeleteTask,
            loading: loading,
          },
          {
            text: 'Cancel',
            preset: 'secondary',
            onPress: () => {
              Modal.hide();
            },
          },
        ],
      });
    }, 500);
  }

  const _renderRight = () => {
    return (
      <Block ref={refMeasure}>
        <Button onPress={onShowTooltip}>
          <FastImage source={images.ic_more} style={styles.iconMore} tintColor={theme.primaryText} />
        </Button>
        {measure ? (
          <Tooltip
            isVisible={!!showTooltip}
            onClose={_onClose}
            wrapperStyle={{
              top: measure.pageY + 16,
              width: TOOLTIP_TASK_DETAIL_HEADER_WIDTH,
              borderRadius: 6,
              left: SpacingDefault.width - SpacingDefault.normal * 2 - TOOLTIP_TASK_DETAIL_HEADER_WIDTH,
            }}
          >
            <Block paddingHorizontal={SpacingDefault.small} paddingVertical={16}>
              <Button style={styles.buttonDelete} onPress={onEditProject}>
                <FastImage source={images.ic_edit} style={styles.iconDelete} tintColor={theme.primaryText} />
                <Spacer width={'small'} />
                <Typo
                  color={theme.primaryText}
                  preset="b16"
                  text={'Edit'} />
              </Button>
              <Spacer height={16} />
              <Divider />
              <Spacer height={16} />
              <Button style={styles.buttonDelete} onPress={onDeleteProject}>
                <FastImage source={images.ic_delete} style={styles.iconDelete} tintColor={colors.red} />
                <Spacer width={'small'} />
                <Typo
                  color={theme.primaryText}
                  preset="b16"
                  text={'Delete'} />
              </Button>
            </Block>
          </Tooltip>
        ) : <></>
        }
      </Block >
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

  const renderMember = (item: User, index: number) => {
    return (
      <Block key={`${item._id}-${index}`} row alignCenter justifyContent="space-between">
        <FastImage source={{uri: item?.profileInfo?.avatar}} style={styles.avatarMember} />
      </Block>
    )
  }

  if (isEmpty(project)) return <></>;

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Project Detail" onPressLeft={onBack} renderRight={_renderRight} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        onLayout={_onLayoutSV}>
        <FastImage source={images.project_cover_default} style={styles.cover} resizeMode="cover" />
        <Spacer height={16} />
        <Block paddingHorizontal={SpacingDefault.normal}>
          <Typo text={project?.projectInfo.title || ''} preset="b20" color={theme.primaryText} />
          <Spacer height={4} />
          <Typo preset="r14" color={theme.primaryText}>{project?.projectInfo.status}</Typo>
          <Spacer height={24} />
          <Block row alignCenter justifyContent="space-between">
            <Typo text="Members" preset="b16" color={theme.primaryText} />
            <Button style={styles.buttonAdd} onPress={openMemberModal}>
              <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={colors.primary} />
              <Spacer width={'tiny'} />
              <Typo text="Add members" preset="r14" color={colors.primary} />
            </Button>
          </Block>
          <Spacer height={12} />
          <Block row alignCenter>
            {allMembers?.map(renderMember)}
          </Block>
        </Block>
        <Spacer height={32} />
        <Block paddingHorizontal={SpacingDefault.normal}>
          <Typo text="Description" preset="b16" color={theme.primaryText} />
          <Spacer height={8} />
          {project?.projectInfo.description ? (
            <TextShowMore
              txt={project?.projectInfo.description || ''}
              textColor={theme.secondaryText}
              fontSize="FONT_14" />
          ) : (
            <Typo text="Add description" preset="b14" color={colors.primary} suppressHighlighting onPress={openDescModal} />
          )}
        </Block>
        <Spacer height={24} />
        <Block paddingHorizontal={SpacingDefault.normal}>
          <Block row alignCenter justifyContent="space-between">
            <Typo text="Progress" preset="b16" color={theme.primaryText} />
            <Typo text={`${taskDoneByPercent}%`} preset="r16" color={theme.primaryText} />
          </Block>
          <Spacer height={16} />
          <Block w={'100%'} h={6} bgColor={theme.backgroundBox} borderRadius={100}>
            <Block position="absolute" w={`${taskDoneByPercent}%`} h={6} top={0} left={4} bgColor={project?.projectInfo.color} styleOverride={styles.progressBar}>
              <Block w={20} h={20} borderRadius={12} borderWidth={6} borderColor={project?.projectInfo.color} bgColor={theme.background} position="absolute" top={-8} right={-8} />
            </Block>
          </Block>
        </Block>
        <Spacer height={16} />
        <Block h={mainScrollViewHeight}>
          <Spacer height={16} />
          <Block paddingHorizontal={SpacingDefault.normal} block>
            <Block row alignCenter justifyContent="space-between">
              <Typo text="Tasks" preset="b16" color={theme.primaryText} />
              {project?.tasks?.length === 0 ? <></> : (
                <Button style={styles.buttonAdd} onPress={onCreateNewTask}>
                  <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={colors.primary} />
                  <Spacer width={'tiny'} />
                  <Typo text="Add new" preset="r14" color={colors.primary} />
                </Button>
              )}
            </Block>
            <Spacer height={16} />
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatlistContainer}
              data={project?.tasks || []}
              keyExtractor={item => item._id}
              renderItem={renderTaskItem}
              ListEmptyComponent={renderEmpty} />
          </Block>
        </Block>
      </ScrollView>

      <AddDescriptionModal
        currentDesc={project?.projectInfo?.description || ''}
        isVisible={isDescVisible}
        onCloseModal={closeDescModal}
        onAddDesc={(_desc: string) => onUpdateTask({description: _desc})} />
      <AddMemberModal
        loading={loading}
        members={project?.participantInfo?.members || []}
        owner={project?.participantInfo?.owner}
        isVisible={isMemberVisible}
        onCloseModal={closeMemberModal}
        onAddMember={(memberIds: string[]) => onUpdateTask({memberIds})}
      />
    </Container>
  );
};

const AVATAR_SIZE = 40;

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
    width: 32,
    height: 32,
    borderRadius: 16
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
  buttonDelete: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDelete: {
    width: 16,
    height: 16,
  },
  iconMore: {
    width: 24,
    height: 24,
    transform: [{rotate: '90deg'}],
  },
  flatlistContainer: {
    paddingBottom: 16
  },
  avatarMember: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: -AVATAR_SIZE / 2
  }
});

export default ProjectDetail;
