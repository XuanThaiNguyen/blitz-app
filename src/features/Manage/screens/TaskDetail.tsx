import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {SpacingDefault} from '../../../themes/Spacing';
import {isEmpty} from '../../../utils/handleUtils';


const TaskDetail = () => {
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.TaskDetail>>();
  const {taskId = ''} = route.params;

  useEffect(() => {
    if (!isEmpty(taskId)) {
      console.log('taskId', taskId);
    }
  }, [taskId]);

  return (
    <Container style={styles.container}>
      <InsetSubstitute />
      <Header titleHeader="Task Detail" />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.medium,
  },
});

export default TaskDetail;
