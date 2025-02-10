import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import {SnackBar} from '../components/SnackBar';
import {ProjectProps} from '../model/Project.props';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {AppState} from '../redux/reducer';
import {actions as UserActions} from '../redux/user';
import {ApiStatus} from '../services/api/ApiStatus';
import {getProjects} from '../services/api/project';
import {isEmpty} from '../utils/handleUtils';
import MainStack from './MainStack';
import {navigationRef} from './navigationUtil';
import Screen from './Screen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const user = useAppSelector((state: AppState) => state.user.user || {});
  const dispatch = useAppDispatch();

  const getUserProjects = async () => {
    try {
      const {data: dataProjects} = await getProjects();
      if (dataProjects?.status === ApiStatus.OK) {
        dispatch(UserActions.setProjects(dataProjects?.data));
        const defaultProject = dataProjects?.data.find((item: ProjectProps) => item.projectInfo.isDefaultProject);
        dispatch(UserActions.setDefaultProject(defaultProject));
      }
    } catch (err: any) {
      console.log('errr', err);
    }
  };

  useEffect(() => {
    if (isEmpty(user)) return;
    getUserProjects();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <SnackBar />
      <Stack.Navigator>
        <Stack.Screen
          name={Screen.RootStack}
          component={MainStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
