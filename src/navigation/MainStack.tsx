import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MainTab from './MainTab';
import Screen from './Screen';
import CreateTask from '../features/Manage/screens/CreateTask';
import CreateTag from '../features/Manage/screens/CreateTag';

// const Stack = createNativeStackNavigator<MainStackScreenProps>();
const Stack = createNativeStackNavigator<any>();

const MainStack = () => {
  // const user = useSelector((state: AppState) => state.user.user);
  let initialRouteName = Screen.MainTab;
  // if (!user) {
  //   initialRouteName = Screen.Login;
  // }

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen name={Screen.MainTab} component={MainTab} />
      <Stack.Screen name={Screen.CreateTask} component={CreateTask} />
      <Stack.Screen name={Screen.CreateTag} component={CreateTag} />
    </Stack.Navigator>
  );
};

export default MainStack;
