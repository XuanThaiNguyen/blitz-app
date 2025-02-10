import {NavigatorScreenParams} from '@react-navigation/native';

import {CreateTaskFormProps, TimeFilterKey} from '../features/Manage/constant/Model.props';
import {MainTabScreenProps} from './MainTabScreenProps';
import Screen from './Screen';

export type MainStackScreenProps = {
  RootStack: undefined;
  MainTab: NavigatorScreenParams<MainTabScreenProps>;
  [Screen.Register]: undefined;
  [Screen.Login]: undefined;
  [Screen.Notification]: undefined;
  [Screen.CreateTask]: {
    projectId?: string;
    isEdit?: boolean;
    task?: CreateTaskFormProps | null;
    taskId?: string;
  };
  [Screen.CreateTag]: {
    projectId?: string;
  };
  [Screen.CreateProject]: undefined;
  [Screen.MyProjects]: undefined;
  [Screen.Profile]: undefined;
  [Screen.TaskDetail]: {
    taskId: string;
    fromScreen?: Screen;
    times?: number;
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
  [Screen.Account]: undefined;
  [Screen.AllTasks]: undefined;
};
