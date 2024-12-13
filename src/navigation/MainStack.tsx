import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MainTab from './MainTab';
import Screen from './Screen';

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
    </Stack.Navigator>
  );
};

export default MainStack;
