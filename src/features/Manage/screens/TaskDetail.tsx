import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {alertBottomModal} from '../../../components/AlertBottomContent/AlertBottomContent';
import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import Modal from '../../../components/Modal';
import {Spacer} from '../../../components/Spacer/Spacer';
import {useTheme} from '../../../context/ThemeProvider';
import {TaskProps} from '../../../model/Task.props';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import {reset} from '../../../navigation/navigationUtil';
import Screen from '../../../navigation/Screen';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {deleteTaskById, getTaskById} from '../../../services/api/task';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import images from '../../../themes/Images';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';
import TaskPomodoroItem from '../../Pomodoro/components/TaskPomodoroItem';
import {Block} from '../../../components/Block/Block';
import {Typo} from '../../../components/Typo/Typo';
import {Divider} from '../../../components/Divider/DIvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TaskDetail = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.TaskDetail>>();
  const {taskId = ''} = route.params;
  const {theme} = useTheme();

  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<TaskProps | null>();

  useEffect(() => {
    if (!isEmpty(taskId)) {
      getTaskDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  const _renderRight = () => {
    return (
      <Button>
        <FastImage source={images.ic_more} style={styles.iconMore} tintColor={theme.primaryText} />
      </Button>
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
  };

  if (isEmpty(task) || isEmpty(taskId)) {
    return <></>;
  }

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Task Detail" renderRight={_renderRight} />
      <Spacer height={16} />
      <Block block>
        <TaskPomodoroItem task={task!} style={styles.taskItem} />
        <Spacer height={24} />
        <Block mHoz={SpacingDefault.medium} paddingHorizontal={SpacingDefault.normal} bgColor={theme.backgroundBox} borderRadius={12}>
          <Block row alignCenter justifyContent="space-between" paddingVertical={16}>
            <Block>
              <Typo text="Pomodoro" />
            </Block>
            <Block>
              <Typo text="4" />
            </Block>
          </Block>
          <Divider height={StyleSheet.hairlineWidth} width={'100%'} color={theme.divider} />
          <Block row alignCenter justifyContent="space-between" paddingVertical={16}>
            <Block>
              <Typo text="Due Date" />
            </Block>
            <Block>
              <Typo text="Today" />
            </Block>
          </Block>
          <Divider height={StyleSheet.hairlineWidth} width={'100%'} color={theme.divider} />
          <Block row alignCenter justifyContent="space-between" paddingVertical={16}>
            <Block>
              <Typo text="Priority" />
            </Block>
            <Block>
              <Typo text="Medium" />
            </Block>
          </Block>
          <Divider height={StyleSheet.hairlineWidth} width={'100%'} color={theme.divider} />
          <Block row alignCenter justifyContent="space-between" paddingVertical={16}>
            <Block>
              <Typo text="Status" />
            </Block>
            <Block>
              <Typo text="Not Start Yet" />
            </Block>
          </Block>
        </Block>
      </Block>
      <Button style={styles.taskItem} preset="primary" loading={loading} text="Delete Task" onPress={onDeleteTask} />
      <Spacer height={insets.bottom + 16} />
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
});

export default TaskDetail;
