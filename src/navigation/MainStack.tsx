import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Login from '../features/Auth/screens/Login';
import Register from '../features/Auth/screens/Register';
import CreateTag from '../features/Manage/screens/CreateTag';
import CreateTask from '../features/Manage/screens/CreateTask';
import SearchTask from '../features/Manage/screens/SearchTask';
import TaskDetail from '../features/Manage/screens/TaskDetail';
import TaskManageFilter from '../features/Manage/screens/TaskManageFilter';
import Pomodoro from '../features/Pomodoro/screens/Pomodoro';
import Profile from '../features/Profile/screens/Profile';
import {useAppSelector} from '../redux/hook';
import {AppState} from '../redux/reducer';
import {MainStackScreenProps} from './MainStackScreenProps';
import MainTab from './MainTab';
import Screen from './Screen';

const Stack = createNativeStackNavigator<MainStackScreenProps>();

const MainStack = () => {
  const user = useAppSelector((state: AppState) => state.user.user);
  let initialRouteName = Screen.MainTab;
  if (!user) {
    initialRouteName = Screen.Login;
  }

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen name={Screen.MainTab} component={MainTab} />
      <Stack.Screen name={Screen.CreateTask} component={CreateTask} />
      <Stack.Screen name={Screen.CreateTag} component={CreateTag} />
      <Stack.Screen name={Screen.Login} component={Login} />
      <Stack.Screen name={Screen.Register} component={Register} />
      <Stack.Screen name={Screen.Profile} component={Profile} />
      <Stack.Screen name={Screen.TaskDetail} component={TaskDetail} />
      <Stack.Screen name={Screen.TaskManageFilter} component={TaskManageFilter} />
      <Stack.Screen name={Screen.SearchTask} component={SearchTask} />
      <Stack.Screen name={Screen.Pomodoro} component={Pomodoro} />
    </Stack.Navigator>
  );
};

export default MainStack;
