import {NavigatorScreenParams} from '@react-navigation/native';

import {TimeFilterKey} from '../features/Manage/constant/Model.props';
import {MainTabScreenProps} from './MainTabScreenProps';
import Screen from './Screen';

export type MainStackScreenProps = {
  RootStack: undefined;
  MainTab: NavigatorScreenParams<MainTabScreenProps>;
  [Screen.Register]: undefined;
  [Screen.Login]: undefined;
  [Screen.CreateTask]: undefined;
  [Screen.CreateTag]: undefined;
  [Screen.Profile]: undefined;
  [Screen.TaskDetail]: {
    taskId: string;
  };
  [Screen.TaskManageFilter]: {
    filterKey: TimeFilterKey;
  };
  [Screen.SearchTask]: undefined;
};
