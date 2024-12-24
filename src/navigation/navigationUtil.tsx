import {CommonActions, NavigationContainerRef, StackActions} from '@react-navigation/native';
import * as React from 'react';

import Screen from './Screen';

//@ts-ignore
export const navigationRef = React.createRef<NavigationContainerRef>();

export function reset(name: string, params = {}) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name, params}],
    }),
  );
}

export function showLoginModal(params?: {key?: string; deepLinkKeyDevice?: string, verifyDevice?: string, fromScreen?: string}) {
  navigationRef.current?.navigate(Screen.Login, params);
}

export function push(name: Screen, params?: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}
