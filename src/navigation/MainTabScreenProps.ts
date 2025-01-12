import {ProjectProps} from '../model/Project.props';
import Screen from './Screen';

export type MainTabScreenProps = {
  [Screen.Manage]: undefined;
  [Screen.Profile]: undefined;
  [Screen.CreateTask]: {
    projectId?: ProjectProps;
  }
};
