import {NavigationProp, RouteProp, StackActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';

import Container from '../../../components/Container/Container';
import Header from '../../../components/Header/Header';
import {InsetSubstitute} from '../../../components/InsetSubstitute/InsetSubstitute';
import {MainStackScreenProps} from '../../../navigation/MainStackScreenProps';
import Screen from '../../../navigation/Screen';
import {ApiStatus} from '../../../services/api/ApiStatus';
import {getProjectDetailById} from '../../../services/api/project';
import {isEmpty} from '../../../utils/handleUtils';

const ProjectDetail = () => {
  const {dispatch} = useNavigation<NavigationProp<MainStackScreenProps>>();
  const route = useRoute<RouteProp<MainStackScreenProps, Screen.ProjectDetail>>();
  const {times = 1, projectId = ''} = route.params;
  const popActions = StackActions.pop(times);

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
        console.log('dataaaa', data.data);
      }
    } catch (err) {

    }
  };

  return (
    <Container>
      <InsetSubstitute />
      <Header titleHeader="Project Detail" onPressLeft={onBack} />
    </Container>
  );
};

export default ProjectDetail;
