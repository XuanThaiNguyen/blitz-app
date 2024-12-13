import {CommonActions, NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';

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
