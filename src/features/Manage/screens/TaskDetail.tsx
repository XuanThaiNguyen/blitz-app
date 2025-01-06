import {NavigationProp, RouteProp, StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter, ScrollView, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {alertBottomModal} from '../../../components/AlertBottomContent/AlertBottomContent';
import {Block} from '../../../components/Block/Block';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {Divider} from '../../../components/Divider/DIvider';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import Modal from '../../../components/Modal';
import {Spacer} from '../../../components/Spacer/Spacer';
import {initMeasure, TOOLTIP_TASK_DETAIL_HEADER_WIDTH} from '../../../components/Tooltip/Constant';
import Tooltip from '../../../components/Tooltip/Tooltip';
import {MeasureObject} from '../../../components/Tooltip/Tooltip.prop';
import {Typo} from '../../../components/Typo/Typo';
import {useTheme} from '../../../context/ThemeProvider';
import {TaskProps} from '../../../model/Task.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {reset} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {deleteTaskById, getTaskById, updateTaskById} from '../../../services/api/task';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import colors from '../../../themes/Colors';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';
import TaskPomodoroItem from '../../Pomodoro/components/TaskPomodoroItem';
import TextField from '../../../components/TextField/TextField';
import UpdateTaskItem from '../components/UpdateTaskItem';
import SelectPriorityModal from '../components/SelectPriorityModal';
import {PriorityProps, PriorityTask} from '../constant/Model.props';

const TAGS = [
  {
    key: 'Work',
    color: '#1B97F0',
  },
  {
    key: 'Design',
    color: '#8CC356',
  },
  {
    key: 'Productive',
    color: '#9E2AAD',
  },
];

const TaskDetail = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.TaskDetail>>();
  const {dispatch} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const {taskId = '', times = 1} = route.params;
  const popActions = StackActions.pop(times);
  const {theme} = useTheme();
  const refMeasure = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<TaskProps | null>();
  const [measure, setMeasure] = useState<MeasureObject>(initMeasure);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tags] = useState(TAGS);
  const [note, setNote] = useState('');
  const [isPriorityVisible, setIsPriorityVisible] = useState(false);

  const openPriorityModal = () => setIsPriorityVisible(true);
  const closePriorityModal = () => setIsPriorityVisible(false);

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
                <FastImage source={images.ic_add} style={styles.iconDelete} tintColor={colors.red} />
                <Spacer width={'smaller'} />
                <Typo
                  color={theme.primaryText}
                  preset="b14"
                  text={'Delete'} />
              </Button>
            </Block>
          </Tooltip>
        ) : <></>
        }
      </Block >
    );
  };

  const renderTag = (item: any) => {
    return (
      <Block
        key={item.key}
        row
        alignCenter
        paddingVertical={4}
        paddingHorizontal={SpacingDefault.smaller}
        borderWidth={1}
        borderColor={item.color}
        borderRadius={100}
        mRight={SpacingDefault.small}>
        <Typo text={`#${item.key}`} color={item.color} preset="b14" />
        <Spacer width={'tiny'} />
        <FastImage source={images.ic_add} style={{width: 24, height: 24, transform: [{rotate: '45deg'}]}} tintColor={theme.primaryText} />
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

  const onUpdatePriority = async (_priority: PriorityProps) => {
    try {
      const {data} = await updateTaskById(taskId, {priority: _priority.key});
      console.log('22222', data);
      // if (data.status === ApiStatus.OK) {
      //   console.log('22222', data.data);
      // }
    } catch (err) {
      console.log('err', err);
    }
  };

  if (isEmpty(task) || isEmpty(taskId)) {
    return <></>;
  }

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Task Detail" renderRight={_renderRight} onPressLeft={onBack} />
      <Spacer height={8} />
      <ScrollView contentContainerStyle={{paddingBottom: insets.bottom + 16, paddingTop: 8}}>
        <Block block>
          <TaskPomodoroItem task={task!} style={styles.taskItem} />
          <Spacer height={24} />
          <Block
            mHoz={SpacingDefault.medium}
            paddingHorizontal={SpacingDefault.normal}
            bgColor={theme.backgroundBox}
            borderRadius={12}>
            <Block row alignCenter justifyContent="space-between" paddingVertical={16}>
              <Block>
                <Typo text="Pomodoro" />
              </Block>
              <Block>
                <Typo text="4" />
              </Block>
            </Block>
            <Divider height={StyleSheet.hairlineWidth} width={'100%'} color={theme.divider} />
            <UpdateTaskItem title={'Due Date'} value={'Today'} />
            <Divider height={StyleSheet.hairlineWidth} width={'100%'} color={theme.divider} />
            <UpdateTaskItem title={'Priority'} value={task?.priority || PriorityTask.LOW} onUpdateTask={openPriorityModal} />
            {/* <Divider height={StyleSheet.hairlineWidth} width={'100%'} color={theme.divider} />
            <UpdateTaskItem title={'Status'} value={'Not Start Yet'} /> */}
          </Block>
          <Spacer height={16} />
          <Block
            mHoz={SpacingDefault.medium}
            paddingHorizontal={SpacingDefault.normal}
            bgColor={theme.backgroundBox}
            borderRadius={12}>
            <Button style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 16}}>
              <FastImage source={images.ic_add} style={styles.iconAdd} tintColor={theme.primaryText} />
              <Spacer width={'small'} />
              <Typo text="Add Task" preset="b16" color={theme.secondaryText} />
            </Button>
          </Block>
          <Spacer height={32} />
          <Block mHoz={SpacingDefault.medium}>
            <Typo text="Tags" preset="b16" color={theme.primaryText} />
            <Spacer height={16} />
            <Block row alignCenter flexWrap="wrap">
              {tags.map(renderTag)}
              {/* <Button style={{paddingVertical: 4, paddingHorizontal: SpacingDefault.small, borderWidth: 1, borderColor: theme.secondaryText, borderRadius: 100}} onPress={() => { }}>
              <FastImage source={images.ic_add} style={{width: 24, height: 24}} tintColor={theme.primaryText} />
            </Button> */}
            </Block>
          </Block>
          <Spacer height={32} />
          <Block mHoz={SpacingDefault.medium}>
            <Typo text="Add a note" preset="b16" color={theme.primaryText} />
            <Spacer height={16} />
            <TextField
              value={note}
              onChangeText={setNote}
              inputHeight={100}
              placeholder="Add note here..."
              multiline
              blockInputStyle={{alignItems: 'flex-start'}}
              inputStyle={{paddingVertical: 12, paddingHorizontal: SpacingDefault.tiny, alignItems: 'flex-start'}}
            />
          </Block>
          <Spacer height={32} />
          <Block mHoz={SpacingDefault.medium}>
            <Typo text="Add attachment" preset="b16" color={theme.primaryText} />
            <Spacer height={16} />
            <Button center height={100} buttonColor={theme.backgroundBox}>
              <Typo text="Upload" preset="r14" color={theme.secondaryText} />
            </Button>
          </Block>
        </Block>
      </ScrollView>

      <SelectPriorityModal priority={task?.priority || PriorityTask.LOW} onSelectPriority={onUpdatePriority} isVisible={isPriorityVisible} onCloseModal={closePriorityModal} />
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
    marginHorizontal: SpacingDefault.medium,
  },
  buttonDelete: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDelete: {
    width: 24,
    height: 24,
  },
  iconAdd: {
    width: 28,
    height: 28,
  },
});

export default TaskDetail;
