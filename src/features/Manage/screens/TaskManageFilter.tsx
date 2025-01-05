import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';

import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {TimeFilterKey} from '../constant/Model.props';

const TaskManageFilter = () => {
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.TaskManageFilter>>();
  const {filterKey = TimeFilterKey.TODAY} = route.params;

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader={filterKey} />
    </Container>
  );
};

export default TaskManageFilter;
