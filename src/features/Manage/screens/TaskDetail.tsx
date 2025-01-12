import {NavigationProp, RouteProp, StackActions, useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter, ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
import {initMeasure, TOOLTIP_TASK_DETAIL_HEADER_WIDTH} from '../../../components/Tooltip/Constant';
import Tooltip from '../../../components/Tooltip/Tooltip';
import {MeasureObject} from '../../../components/Tooltip/Tooltip.prop';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {TagProps} from '../../../model/Tag.props';
import {TaskProps} from '../../../model/Task.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {reset} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {deleteTaskById, getTaskById, updateTaskById} from '../../../services/api/task';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import {NONE_VALUE} from '../../../themes/Constant';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {DATE_FORMAT, formatDate} from '../../../utils/handleDateTime';
import {getColorsByPriority} from '../../../utils/handleStyle';
import {isEmpty} from '../../../utils/handleUtils';
import AddDescriptionModal from '../components/AddDescriptionModal';
import AddSubTaskModal from '../components/AddSubTaskModal';
import SelectPriorityModal from '../components/SelectPriorityModal';
import SelectStatusModal from '../components/SelectStatusModal';
import SelectTagModal from '../components/SelectTagModal';
import SelectTimeModal from '../components/SelectTimeModal';
import UpdateTaskItem from '../components/UpdateTaskItem';
import {PriorityProps, PriorityTask, StatusTask} from '../constant/Model.props';

const TaskDetail = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.TaskDetail>>();
  const {dispatch} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const {taskId = '', times = 1, project} = route.params;

  const popActions = StackActions.pop(times);
  const {theme} = useTheme();
  const refMeasure = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<TaskProps | null>();

  const [measure, setMeasure] = useState<MeasureObject>(initMeasure);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPriorityVisible, setIsPriorityVisible] = useState(false);
  const [isTimeVisible, setIsTimeVisible] = useState(false);
  const [isDescVisible, setIsDescVisible] = useState(false);
  const [isTagVisible, setIsTagVisible] = useState(false);
  const [isSubTaskVisible, setIsSubTaskVisible] = useState(false);
  const [isStatusVisible, setIsStatusVisible] = useState(false);

  const openPriorityModal = () => setIsPriorityVisible(true);
  const closePriorityModal = () => setIsPriorityVisible(false);

  const openStatusModal = () => setIsStatusVisible(true);
  const closeStatusModal = () => setIsStatusVisible(false);

  const openSubTaskModal = () => setIsSubTaskVisible(true);
  const closeSubTaskModal = () => setIsSubTaskVisible(false);

  const openDescModal = () => setIsDescVisible(true);
  const closeDescModal = () => setIsDescVisible(false);

  const openTagModal = () => setIsTagVisible(true);
  const closeTagModal = () => setIsTagVisible(false);

  const openTimeModal = () => {
    setIsTimeVisible(true);
  };
  const closeTimeModal = () => setIsTimeVisible(false);

  const onSelectTime = (date: {startDate: Date, endDate: Date}) => {
    let _timing: any = {};
    if (!isEmpty(date.startDate)) {
      _timing = {
        startDate: moment(date.startDate).startOf('day').toDate(),
        endDate: moment(date.startDate).endOf('day').toDate(),
      };
    }
    if (!isEmpty(date.endDate)) {
      _timing = {
        endDate: moment(date.endDate).endOf('day').toDate(),
      };
    }
    onUpdateTask({timing: _timing});
  };

  useEffect(() => {
    if (!isEmpty(taskId)) {
      getTaskDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

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
            <Block paddingHorizontal={SpacingDefault.smaller} paddingVertical={8}>
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
        styleOverride={{marginBottom: 12, marginRight: SpacingDefault.small}}
        alignCenter
        paddingVertical={4}
        paddingHorizontal={SpacingDefault.smaller}
        borderWidth={1}
        borderColor={item.color}
        borderRadius={100}>
        <Typo text={`#${item.name}`} color={item.color} preset="b14" />
        <Spacer width={'tiny'} />
        <Button onPress={onRemoveTag(item._id)}>
          <FastImage source={images.ic_close} style={{width: 16, height: 16}} tintColor={theme.secondaryText} />
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
      <Block mHoz={SpacingDefault.normal}>
        <Typo text="Tags" preset="b16" color={theme.primaryText} />
        <Spacer height={16} />
        <Block row flexWrap="wrap">
          {matchingTags && matchingTags?.length > 0 ? matchingTags.map(renderTag) : <></>}
          <Button onPress={openTagModal} style={{height: 26, width: 48, borderRadius: 100, borderWidth: StyleSheet.hairlineWidth, borderColor: theme.secondaryText, alignItems: 'center', justifyContent: 'center'}}>
            <FastImage source={images.ic_close} style={{width: 16, height: 16, transform: [{rotate: '45deg'}]}} tintColor={theme.primaryText} />
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
      <ScrollView contentContainerStyle={{paddingBottom: insets.bottom + 16, paddingTop: 8}} showsVerticalScrollIndicator={false}>
        <Block block>
          {/* <TaskPomodoroItem task={task!} style={styles.taskItem} /> */}
          <Button style={[{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderLeftWidth: 4,
            paddingHorizontal: SpacingDefault.normal,
            paddingVertical: 16,
            borderRadius: 6,
            marginHorizontal: SpacingDefault.normal,
            backgroundColor: theme.backgroundBox,
          }, {borderLeftColor: getColorsByPriority({priority: task?.priority || PriorityTask.LOW})}]}>
            <Typo text={task?.title || ''} color={task?.status === StatusTask.Done ? theme.secondaryText : theme.primaryText} preset="b16" flex style={{textDecorationLine: task?.status === StatusTask.Done ? 'line-through' : 'none'}} />
            <Checkbox size={20} checked={task?.status === StatusTask.Done} onChange={(checked: boolean) => onUpdateTask({status: checked ? StatusTask.Done : StatusTask.NotStartYet})} />
          </Button>
          <Spacer height={24} />
          <Block
            mHoz={SpacingDefault.normal}
            paddingHorizontal={SpacingDefault.normal}
            bgColor={theme.backgroundBox}
            borderRadius={12}>
            {/* <UpdateTaskItem iconTitle={images.ic_pomodoro} title={'Pomodoro'} value={'4'} />
            <Divider /> */}
            <UpdateTaskItem iconTitle={images.ic_planned} title={'Due Date'} value={task?.timing.endDate && task.timing.startDate ? `${formatDate(task.timing.startDate, DATE_FORMAT.FIRST)} - ${formatDate(task.timing.endDate, DATE_FORMAT.FIRST)}` : (!task?.timing.endDate && task?.timing.startDate) ? formatDate(task.timing.startDate, DATE_FORMAT.FIRST) : NONE_VALUE} onUpdateTask={openTimeModal} />
            <Divider />
            <UpdateTaskItem iconTitle={images.ic_tomorrow} title={'Priority'} value={task?.priority || PriorityTask.LOW} onUpdateTask={openPriorityModal} />
            <Divider />
            <UpdateTaskItem iconTitle={images.ic_today} title={'Status'} value={task?.status || StatusTask.NotStartYet} onUpdateTask={openStatusModal} />
            <Divider />
            <UpdateTaskItem iconTitle={images.ic_project} title={'Project'} value={project?.projectInfo?.title || NONE_VALUE} canUpdate={false} />
            <Divider />
            <Block row alignCenter justifyContent="space-between" pTop={16}>
              <Block row alignCenter>
                <FastImage source={images.ic_document} style={{width: 16, height: 16}} tintColor={theme.primaryText} />
                <Spacer width={'small'} />
                <Typo text={'Description'} color={theme.primaryText} preset="r16" />
              </Block>
              <Button onPress={openDescModal}>
                {!isEmpty(task?.description) ? (
                  <FastImage source={images.ic_edit} style={{width: 16, height: 16}} tintColor={theme.primaryText} />
                ) : (
                  <Typo text="Thêm mô tả" color={colors.primary} preset="b16" />
                )}
              </Button>
            </Block>
            {!isEmpty(task?.description) ? (
              <>
                <Spacer height={8} />
                <Typo text={task?.description || ''} color={theme.primaryText} preset="r16" />
                <Spacer height={16} />
              </>
            ) : <Spacer height={16} />}
          </Block>
          <Spacer height={16} />
          <Block
            mHoz={SpacingDefault.normal}
            paddingHorizontal={SpacingDefault.normal}
            bgColor={theme.backgroundBox}
            paddingVertical={16}
            borderRadius={12}>
            {task?.subTasks && task?.subTasks?.length > 0 ? task?.subTasks.map((subTask) => (
              <Block key={subTask._id}>
                <Block row alignCenter justifyContent="space-between">
                  <Typo text={subTask.title} preset="b16" color={subTask.status === StatusTask.Done ? theme.secondaryText : theme.primaryText} style={{textDecorationLine: subTask.status === StatusTask.Done ? 'line-through' : 'none'}} />
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
                <Spacer height={16} />
              </Block>
            )) : <></>}
            <Button style={{flexDirection: 'row', alignItems: 'center'}} onPress={openSubTaskModal}>
              <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={theme.primaryText} />
              <Spacer width={'small'} />
              <Typo text="Add sub task here..." preset="b16" color={theme.secondaryText} />
            </Button>
          </Block>
          <Spacer height={32} />
          {renderTags()}
          <Spacer height={32} />
          <Block mHoz={SpacingDefault.normal}>
            <Typo text="Add attachment" preset="b16" color={theme.primaryText} />
            <Spacer height={16} />
            <Button center height={100} style={{borderRadius: 12}} buttonColor={theme.backgroundBox}>
              <Typo text="Upload" preset="r14" color={theme.secondaryText} />
            </Button>
          </Block>
        </Block>
      </ScrollView>

      <SelectTagModal
        projectId={project._id}
        tags={project.tags || []}
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
      <SelectPriorityModal
        priority={task?.priority || PriorityTask.LOW}
        onSelectPriority={(_priority: PriorityProps) => onUpdateTask({priority: _priority.key})}
        isVisible={isPriorityVisible}
        onCloseModal={closePriorityModal} />
      <SelectStatusModal
        status={task?.status || StatusTask.NotStartYet}
        onSelectStatus={(_status: StatusTask) => onUpdateTask({status: _status})}
        isVisible={isStatusVisible}
        onCloseModal={closeStatusModal} />
      <SelectTimeModal
        minDate={formatDate(new Date(), DATE_FORMAT.FOUR)}
        title={'Select Due Date'}
        mode="multiple"
        isVisible={isTimeVisible}
        onCloseModal={closeTimeModal}
        onSelectTime={onSelectTime} />
    </Container>
  );
};

const styles = StyleSheet.create({
  iconMore: {
    width: 24,
    height: 24,
    transform: [{rotate: '90deg'}],
  },
  taskItem: {
    marginHorizontal: SpacingDefault.normal,
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
});

export default TaskDetail;
