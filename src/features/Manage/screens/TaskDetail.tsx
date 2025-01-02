import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, StyleSheet} from 'react-native';

import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import {alertBottomModal} from '../../../components/AlertBottomContent/AlertBottomContent';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {deleteTaskById, getTaskById} from '../../../services/api/task';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';
import Modal from '../../../components/Modal';
import {EmitterKeys} from '../../../services/emitter/EmitterKeys';
import {reset} from '../../../navigation/navigationUtil';


const TaskDetail = () => {
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.TaskDetail>>();
  const {taskId = ''} = route.params;

  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState<any>({});
  console.log('tasktask', task);

  useEffect(() => {
    if (!isEmpty(taskId)) {
      getTaskDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

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

  return (
    <Container style={styles.container}>
      <InsetSubstitute />
      <Header titleHeader="Task Detail" />
      <Button preset="primary" loading={loading} text="Delete Task" onPress={onDeleteTask} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.medium,
  },
});

export default TaskDetail;
