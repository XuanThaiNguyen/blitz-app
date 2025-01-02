import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';

import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {SpacingDefault} from '../../../themes/Spacing';
import {TimeFilterKey} from '../constant/Model.props';

const TaskManageFilter = () => {
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.TaskManageFilter>>();
  const {filterKey = TimeFilterKey.TODAY} = route.params;

  return (
    <Container style={styles.container}>
      <InsetSubstitute />
      <Header titleHeader={filterKey} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SpacingDefault.medium,
  },
});

export default TaskManageFilter;
