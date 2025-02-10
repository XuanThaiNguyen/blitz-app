import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {useTheme} from '../context/ThemeProvider';
import CreateAll from '../features/Manage/screens/CreateAll';
import Manage from '../features/Manage/screens/Manage';
import Schedule from '../features/Schedule/Schedule';
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
      backBehavior={'initialRoute'}
    >
      <Tab.Screen
        name={Screen.Manage}
        component={Manage}
        options={defaultOptions}
      />
      <Tab.Screen
        name={Screen.CreateAll}
        component={CreateAll}
        options={defaultOptions}
      />
      <Tab.Screen
        name={Screen.Schedule}
        component={Schedule}
        options={defaultOptions}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
