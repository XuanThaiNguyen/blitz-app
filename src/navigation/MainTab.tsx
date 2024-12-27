import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import Manage from '../features/Manage/screens/Manage';
import Setting from '../features/Setting/screens/Setting';
import Screen from './Screen';
import {useTheme} from '../context/ThemeProvider';
import colors from '../themes/Colors';
import TabBar from './TabBar';

// import {Icon} from '../components/Icon/Icon';
// import {IconTypes} from '../themes/Images';

// const Tab = createBottomTabNavigator<MainTabScreenProps>();
const defaultOptions: any = {
  lazy: true,
  tabBarVisible: true,
};

const Tab = createBottomTabNavigator<any>();

const MainTab = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
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
        name={Screen.Setting}
        component={Setting}
        options={defaultOptions}
      />
    </Tab.Navigator>
  );
};

// const RenderIcon = ({icon}: {icon: IconTypes}) => (
//   <Icon icon={icon} resizeMode="contain" size={'medium'} />
// );

export default MainTab;
