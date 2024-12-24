import {NavigatorScreenParams} from '@react-navigation/native';

import Screen from './Screen';
import {MainTabScreenProps} from './MainTabScreenProps';

export type MainStackScreenProps = {
  RootStack: undefined;
  MainTab: NavigatorScreenParams<MainTabScreenProps>;
  [Screen.Register]: undefined;
  [Screen.Login]: undefined;
  [Screen.CreateTask]: undefined;
  [Screen.CreateTag]: undefined;
  [Screen.Profile]: undefined;
};
