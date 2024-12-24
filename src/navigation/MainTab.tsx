import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import Manage from '../features/Manage/screens/Manage';
import Setting from '../features/Setting/screens/Setting';
import Screen from './Screen';

// import {Icon} from '../components/Icon/Icon';
// import {IconTypes} from '../themes/Images';

// const Tab = createBottomTabNavigator<MainTabScreenProps>();
const Tab = createBottomTabNavigator<any>();

const MainTab = () => {
  // const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // backgroundColor: theme.background,
        },
      }}>
      <Tab.Screen
        name={Screen.Manage}
        component={Manage}
        options={{
          // tabBarActiveTintColor: colors.primaryButton,
          // tabBarIcon: ({focused}) => (
          //   <RenderIcon
          //     icon={focused ? images.ic_manage_active : images.ic_manage}
          //   />
          // ),
        }}
      />
      <Tab.Screen
        name={Screen.Setting}
        component={Setting}
        options={{
          // tabBarActiveTintColor: colors.primaryButton,
          // tabBarIcon: ({focused}) => (
          //   <RenderIcon
          //     icon={focused ? images.ic_manage_active : images.ic_manage}
          //   />
          // ),
        }}
      />
    </Tab.Navigator>
  );
};

// const RenderIcon = ({icon}: {icon: IconTypes}) => (
//   <Icon icon={icon} resizeMode="contain" size={'medium'} />
// );

export default MainTab;
