import {NavigationProp, RouteProp, StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {DeviceEventEmitter, ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';

import {alertBottomModal} from '../../../components/AlertBottomContent/AlertBottomContent';
import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Checkbox from '../../../components/Checkbox/Checkbox';
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
import {Theme, useTheme} from '../../../context/ThemeProvider';
import {ProjectProps} from '../../../model/Project.props';
import {TagProps} from '../../../model/Tag.props';
import {TaskProps} from '../../../model/Task.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {reset} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {useAppSelector} from '../../../redux/hook';
import {AppState} from '../../../redux/reducer';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {deleteTaskById, getTaskById, updateTaskById} from '../../../services/api/task';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import {NONE_VALUE} from '../../../themes/Constant';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';
import {isEmpty} from '../../../utils/handleUtils';
import AddDescriptionModal from '../components/AddDescriptionModal';
import AddSubTaskModal from '../components/AddSubTaskModal';
import AssignMemberModal from '../components/AssignMemberModal';
import SelectStatusModal from '../components/SelectStatusModal';
import SelectTagModal from '../components/SelectTagModal';
import {PriorityTask, StatusTask} from '../constant/Model.props';

const TaskDetail = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.TaskDetail>>();
  const {dispatch, navigate} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const {taskId = '', times = 1} = route.params;

  const userProjects = useAppSelector((state: AppState) => state.user.projects || []);

  const popActions = StackActions.pop(times);
  const {theme} = useTheme();
  const styles = useStyles(theme, insets);
  const refMeasure = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<TaskProps | null>();

  const [measure, setMeasure] = useState<MeasureObject>(initMeasure);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDescVisible, setIsDescVisible] = useState(false);
  const [isTagVisible, setIsTagVisible] = useState(false);
  const [isSubTaskVisible, setIsSubTaskVisible] = useState(false);
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [isAssigneeVisible, setIsAssigneeVisible] = useState(false);

  const projectByTask = task && userProjects.find((_project: ProjectProps) => _project?._id === task?.projectId);

  const allMembers = useMemo(() => {
    let _members: any[] = [];
    _members.push(projectByTask?.participantInfo.owner!);

    if (projectByTask?.participantInfo && projectByTask?.participantInfo?.members?.length > 0) {
      _members = [..._members, ...projectByTask?.participantInfo?.members];
    }

    return _members
  }, [projectByTask?.participantInfo])

  const openStatusModal = () => setIsStatusVisible(true);
  const closeStatusModal = () => setIsStatusVisible(false);

  const openSubTaskModal = () => setIsSubTaskVisible(true);
  const closeSubTaskModal = () => setIsSubTaskVisible(false);

  const openDescModal = () => setIsDescVisible(true);
  const closeDescModal = () => setIsDescVisible(false);

  const openTagModal = () => setIsTagVisible(true);
  const closeTagModal = () => setIsTagVisible(false);

  const openAssigneeModal = () => setIsAssigneeVisible(true);
  const closeAssigneeModal = () => setIsAssigneeVisible(false);

  useEffect(() => {
    if (!isEmpty(taskId)) {
      getTaskDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  useEffect(() => {
    const taskListener = DeviceEventEmitter.addListener(EmitterKeys.RELOAD_TASK_DETAIL, () => {
      getTaskDetail();
    });

    return () => {
      taskListener?.remove();
    }
  }, []);

  const onBack = () => dispatch(popActions);

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
              <Button style={styles.buttonDelete} onPress={onEditTask}>
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
              <Button style={styles.buttonDelete} onPress={onDeleteTask}>
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

  const onRemoveTag = (tagId: string) => () => {
    const selectedTags = task?.tags?.filter(ele => ele !== tagId);
    onUpdateTask({tags: selectedTags});
  }

  const renderTag = (item: TagProps, index: number) => {
    return (
      <Block
        key={`${item.name}-${item.color}-${index}`}
        row
        styleOverride={styles.blockTag}
        alignCenter
        paddingVertical={4}
        paddingHorizontal={SpacingDefault.smaller}
        borderWidth={1}
        borderColor={item.color}
        borderRadius={100}>
        <Typo text={`#${item.name}`} color={item.color} preset="b14" />
        <Spacer width={'tiny'} />
        <Button onPress={onRemoveTag(item._id)}>
          <FastImage source={images.ic_close} style={styles.iconClose} tintColor={theme.secondaryText} />
        </Button>
      </Block>
    );
  };

  const getTaskDetail = async () => {
    try {
      const {data} = await getTaskById(taskId);
      if (data.status === ApiStatus.OK) {
        setTask(data.data);
      }
    } catch (err) {

    }
  };

  const onConfirmDeleteTask = async () => {
    setLoading(true);
    try {
      const {data} = await deleteTaskById(taskId);
      if (data.status === ApiStatus.OK) {
        Modal.hide();
        setTimeout(() => {
          alertBottomModal({
            title: 'Success',
            message: 'Delete Task Successfully',
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
  };

  const onEditTask = () => {
    setShowTooltip(false);
    const editTask = {
      project: projectByTask,
      title: task?.title || '',
      description: task?.description || '',
      priority: task?.priority,
      startDate: task?.timing?.startDate,
      endDate: task?.timing?.endDate
    }
    //@ts-ignore
    navigate(Screen.CreateTask, {isEdit: true, task: editTask, projectId: projectByTask._id, taskId: task?._id || ''});
  }

  const onDeleteTask = () => {
    setShowTooltip(false);
    setTimeout(() => {
      alertBottomModal({
        title: 'Delete Task',
        message: 'Are you sure you want to delete this task?',
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
  };

  const onUpdateTask = async (params: any) => {
    try {
      const {data} = await updateTaskById(taskId, params);
      if (data.status === ApiStatus.OK && !isEmpty(data.data)) {
        setTask(data.data);
        setTimeout(() => {
          DeviceEventEmitter.emit(EmitterKeys.RELOAD_TASKS);
          showSnack({msg: 'Update Task Successfully', type: 'success', position: 'top_under_header'});
        }, 500);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const renderTags = () => {
    const matchingTags = task?.availableTags.filter(obj => task?.tags.includes(obj._id));

    return (
      <Block>
        <Typo text="Tags" preset="b16" color={theme.primaryText} />
        <Spacer height={16} />
        <Block row flexWrap="wrap">
          {matchingTags && matchingTags?.length > 0 ? matchingTags.map(renderTag) : <></>}
          <Button onPress={openTagModal} style={styles.buttonTag}>
            <FastImage source={images.ic_close} style={styles.iconTag} tintColor={theme.primaryText} />
          </Button>
        </Block>
      </Block>
    )
  };

  if (isEmpty(task) || isEmpty(taskId)) {
    return <></>;
  }

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Task Detail" renderRight={_renderRight} onPressLeft={onBack} />
      <Spacer height={8} />
      <ScrollView contentContainerStyle={styles.scrollviewContainer} showsVerticalScrollIndicator={false}>
        <Block block paddingHorizontal={SpacingDefault.normal}>
          <Typo text={task?.title || ''} preset="b20" color={theme.primaryText} />
          <Spacer height={16} />
          {!isEmpty(task?.description?.trim()) ? (
            <TextShowMore
              txt={task?.description || ''}
              textColor={theme.secondaryText}
              fontSize="FONT_14" />
          ) : (
            <Button text="Add description" textPreset="r14" textColor={colors.primary} onPress={openDescModal} />
          )}
          <Spacer height={24} />
          <Block row alignCenter>
            <Block row alignCenter block>
              <FastImage source={images.ic_today} style={styles.icon} tintColor={theme.secondaryText} />
              <Spacer width={'smaller'} />
              <Typo text="Status" preset="r16" color={theme.secondaryText} />
            </Block>
            <Block row alignCenter block justifyContent="space-between">
              <Typo text={task?.status || StatusTask.NotStartYet} preset="b16" color={theme.primaryText} />
              <Button onPress={openStatusModal}>
                <FastImage source={images.ic_edit} style={styles.icon} tintColor={theme.primaryText} />
              </Button>
            </Block>
          </Block>
          <Spacer height={16} />
          <Block row alignCenter>
            <Block row alignCenter block>
              <FastImage source={images.ic_personal} style={styles.icon} tintColor={theme.secondaryText} />
              <Spacer width={'smaller'} />
              <Typo text="Assignee" preset="r16" color={theme.secondaryText} />
            </Block>
            <Button block onPress={openAssigneeModal}>
              <FastImage source={{uri: task?.assigneeInfo[0]?.profileInfo?.avatar}} style={styles.avatar} />
            </Button>
          </Block>
          <Spacer height={16} />
          <Block row alignCenter>
            <Block row alignCenter block>
              <FastImage source={images.ic_planned} style={styles.icon} tintColor={theme.secondaryText} />
              <Spacer width={'smaller'} />
              <Typo text="Start Date" preset="r16" color={theme.secondaryText} />
            </Block>
            <Block row alignCenter block>
              <Typo text={task?.timing.startDate ? `${formatDate(new Date(task.timing.startDate), DATE_FORMAT.THIRD)}` : NONE_VALUE} preset="b16" color={theme.primaryText} />
            </Block>
          </Block>
          <Spacer height={16} />
          <Block row alignCenter>
            <Block row alignCenter block>
              <FastImage source={images.ic_planned} style={styles.icon} tintColor={theme.secondaryText} />
              <Spacer width={'smaller'} />
              <Typo text="End Date" preset="r16" color={theme.secondaryText} />
            </Block>
            <Block row alignCenter block>
              <Typo text={task?.timing.endDate ? `${formatDate(new Date(task.timing.endDate), DATE_FORMAT.THIRD)}` : NONE_VALUE} preset="b16" color={theme.primaryText} />
            </Block>
          </Block>
          <Spacer height={16} />
          <Block row alignCenter>
            <Block row alignCenter block>
              <FastImage source={images.ic_project} style={styles.icon} tintColor={theme.secondaryText} />
              <Spacer width={'smaller'} />
              <Typo text="Project" preset="r16" color={theme.secondaryText} />
            </Block>
            <Block row alignCenter block>
              <Typo text={projectByTask?.projectInfo?.title || NONE_VALUE} preset="b16" color={theme.primaryText} />
            </Block>
          </Block>
          <Spacer height={16} />
          <Block row alignCenter>
            <Block row alignCenter block>
              <FastImage source={images.ic_tomorrow} style={styles.icon} tintColor={theme.secondaryText} />
              <Spacer width={'smaller'} />
              <Typo text="Priority" preset="r16" color={theme.secondaryText} />
            </Block>
            <Block row alignCenter block>
              <Typo text={task?.priority || PriorityTask.LOW} preset="b16" color={theme.primaryText} />
            </Block>
          </Block>
          <Spacer height={32} />
          {renderTags()}
          <Spacer height={16} />
          <Block row alignCenter justifyContent="space-between">
            <Typo text="Sub Tasks" preset="b16" color={theme.primaryText} />
          </Block>
          <Spacer height={8} />

          <Block>
            {task?.subTasks && task?.subTasks?.length > 0 ? task?.subTasks.map((subTask) => (
              <Block key={subTask._id} borderWidth={1} borderColor={theme.divider} mBottom={16} paddingVertical={16} paddingHorizontal={SpacingDefault.normal} borderRadius={12}>
                <Block row alignCenter justifyContent="space-between">
                  <Typo text={subTask.title} preset="b16" color={subTask.status === StatusTask.Done ? theme.secondaryText : theme.primaryText} style={subTask.status === StatusTask.Done ? styles.subTaskDone : {}} />
                  <Checkbox
                    checked={subTask.status === StatusTask.Done}
                    onChange={(checked: boolean) => {
                      let newSubTasks = task?.subTasks ? [...task.subTasks] : [];
                      const subtaskIndex = newSubTasks?.findIndex((_subTask) => _subTask.title === subTask.title);
                      if (subtaskIndex !== -1) {
                        newSubTasks[subtaskIndex] = {
                          ...newSubTasks[subtaskIndex],
                          status: checked ? StatusTask.Done : StatusTask.NotStartYet,
                        };
                      }
                      onUpdateTask({subTasks: newSubTasks});
                    }}
                    size={20} />
                </Block>
              </Block>
            )) : <></>}
          </Block>
          <Button style={styles.buttonSubTask} onPress={openSubTaskModal}>
            <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={theme.primaryText} />
            <Spacer width={'smaller'} />
            <Typo text="Add sub task here..." preset="b16" color={theme.secondaryText} />
          </Button>
          <Spacer height={32} />
          <Block>
            <Typo text="Add attachment" preset="b16" color={theme.primaryText} />
            <Spacer height={16} />
            <Button center height={100} style={styles.buttonUpload} buttonColor={theme.backgroundBox}>
              <Typo text="Upload" preset="r14" color={theme.secondaryText} />
            </Button>
          </Block>
        </Block>
      </ScrollView>

      <SelectTagModal
        projectId={projectByTask?._id}
        tags={projectByTask?.tags || []}
        currentTags={task?.availableTags.filter(obj => task?.tags.includes(obj._id))?.map(item => item._id)}
        onSelectTag={(tags: string[]) => onUpdateTask({tags})}
        isVisible={isTagVisible}
        onCloseModal={closeTagModal} />
      <AddDescriptionModal
        currentDesc={task?.description || ''}
        isVisible={isDescVisible}
        onCloseModal={closeDescModal}
        onAddDesc={(_desc: string) => onUpdateTask({description: _desc})} />
      <AddSubTaskModal
        isVisible={isSubTaskVisible}
        currentSubTasks={task?.subTasks || []}
        onCloseModal={closeSubTaskModal}
        onAddSubtask={(subTasks: any[]) => onUpdateTask({subTasks})}
      />
      <SelectStatusModal
        status={task?.status || StatusTask.NotStartYet}
        onSelectStatus={(_status: StatusTask) => onUpdateTask({status: _status})}
        isVisible={isStatusVisible}
        onCloseModal={closeStatusModal} />
      <AssignMemberModal
        isVisible={isAssigneeVisible}
        onCloseModal={closeAssigneeModal}
        selectedMember={task?.assigneeInfo[0] || undefined}
        members={allMembers || []}
        onSelectMember={(assigneeId: string) => onUpdateTask({assigneeId})} />
    </Container>
  );
};

const useStyles = ((theme: Theme, insets: EdgeInsets) => StyleSheet.create({
  iconMore: {
    width: 24,
    height: 24,
    transform: [{rotate: '90deg'}],
  },
  buttonDelete: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDelete: {
    width: 16,
    height: 16,
  },
  iconAdd: {
    width: 28,
    height: 28,
  },
  blockTag: {
    marginBottom: 12,
    marginRight: SpacingDefault.small
  },
  iconClose: {
    width: 16,
    height: 16
  },
  buttonTag: {
    height: 26,
    width: 48,
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.secondaryText,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconTag: {
    width: 16,
    height: 16,
    transform: [{rotate: '45deg'}]
  },
  scrollviewContainer: {
    paddingBottom: insets.bottom + 16,
    paddingTop: 8
  },
  icon: {
    width: 16,
    height: 16
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  subTaskDone: {
    textDecorationLine: 'line-through'
  },
  buttonSubTask: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonUpload: {
    borderRadius: 12
  }
}));

export default TaskDetail;
