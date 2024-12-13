import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Screen from './Screen';
import MainStack from './MainStack';
import {navigationRef} from './navigationUtil';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      {/* <PortalHost name={'UnderAlertBottom'} /> */}
      {/* <AlertBottom /> */}
      {/* <PortalHost name={'AppModal'} /> */}
      {/* <SnackBar /> */}
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
