import {NavigatorScreenParams} from '@react-navigation/native';

import {TimeFilterKey} from '../features/Manage/constant/Model.props';
import {ProjectProps} from '../model/Project.props';
import {MainTabScreenProps} from './MainTabScreenProps';
import Screen from './Screen';

export type MainStackScreenProps = {
  RootStack: undefined;
  MainTab: NavigatorScreenParams<MainTabScreenProps>;
  [Screen.Register]: undefined;
  [Screen.Login]: undefined;
  [Screen.CreateTask]: {
    projectId?: string;
  };
  [Screen.CreateTag]: {
    projectId?: string;
  };
  [Screen.CreateProject]: undefined;
  [Screen.Profile]: undefined;
  [Screen.TaskDetail]: {
    taskId: string;
    fromScreen?: Screen;
    times?: number;
    project: ProjectProps;
  };
  [Screen.ProjectDetail]: {
    projectId: string;
    fromScreen?: Screen;
    times?: number;
  };
  [Screen.TaskManageFilter]: {
    filterKey: TimeFilterKey;
  };
  [Screen.SearchTask]: undefined;
  [Screen.Pomodoro]: undefined;
};
