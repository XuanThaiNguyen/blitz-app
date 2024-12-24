import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import MainStack from './MainStack';
import {navigationRef} from './navigationUtil';
import Screen from './Screen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
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
