import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {useTheme} from '../context/ThemeProvider';
import CreateTask from '../features/Manage/screens/CreateTask';
import Manage from '../features/Manage/screens/Manage';
import Setting from '../features/Setting/screens/Setting';
import colors from '../themes/Colors';
import Screen from './Screen';
import TabBar from './TabBar';

const defaultOptions: any = {
  lazy: true,
  tabBarVisible: true,
};

const Tab = createBottomTabNavigator<any>();

const MainTab = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: theme.secondaryText,
      }}
    >
      <Tab.Screen
        name={Screen.Manage}
        component={Manage}
        options={defaultOptions}
      />
      <Tab.Screen
        name={Screen.CreateTask}
        component={CreateTask}
        options={defaultOptions}
      />
      <Tab.Screen
        name={Screen.Setting}
        component={Setting}
        options={defaultOptions}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
