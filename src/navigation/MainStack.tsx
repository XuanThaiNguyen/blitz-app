import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Account from '../features/Account/screens/Account';
import Profile from '../features/Account/screens/Profile';
import Login from '../features/Auth/screens/Login';
import Register from '../features/Auth/screens/Register';
import AllTasks from '../features/Manage/screens/AllTasks';
import CreateProject from '../features/Manage/screens/CreateProject';
import CreateTag from '../features/Manage/screens/CreateTag';
import CreateTask from '../features/Manage/screens/CreateTask';
import MyProjects from '../features/Manage/screens/MyProjects';
import ProjectDetail from '../features/Manage/screens/ProjectDetail';
import SearchTask from '../features/Manage/screens/SearchTask';
import TaskDetail from '../features/Manage/screens/TaskDetail';
import TaskManageFilter from '../features/Manage/screens/TaskManageFilter';
import Notification from '../features/Notification/screens/Notification';
import Pomodoro from '../features/Pomodoro/screens/Pomodoro';
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
      <Stack.Screen name={Screen.CreateProject} component={CreateProject} />
      <Stack.Screen name={Screen.Login} component={Login} />
      <Stack.Screen name={Screen.Register} component={Register} />
      <Stack.Screen name={Screen.Profile} component={Profile} />
      <Stack.Screen name={Screen.TaskDetail} component={TaskDetail} />
      <Stack.Screen name={Screen.ProjectDetail} component={ProjectDetail} />
      <Stack.Screen name={Screen.TaskManageFilter} component={TaskManageFilter} />
      <Stack.Screen name={Screen.SearchTask} component={SearchTask} />
      <Stack.Screen name={Screen.Pomodoro} component={Pomodoro} />
      <Stack.Screen name={Screen.Notification} component={Notification} />
      <Stack.Screen name={Screen.Account} component={Account} />
      <Stack.Screen name={Screen.MyProjects} component={MyProjects} />
      <Stack.Screen name={Screen.AllTasks} component={AllTasks} />
    </Stack.Navigator>
  );
};

export default MainStack;
