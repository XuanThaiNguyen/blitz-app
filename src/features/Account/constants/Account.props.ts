import {Source} from 'react-native-fast-image';

import Screen from '../../../navigation/Screen';

export enum AccountKeyProps {
  Profile = 'Profile',
  AppAppearance = 'App Appearance',
  MyTasks = 'My Tasks',
  MyProjects = 'My Projects',
  ChangePassword = 'Change Password',
  Notification = 'Notification',
  HelpAndSupport = 'Help and Support'
}

export interface AccountProps {
  key: AccountKeyProps;
  screenId: Screen | null;
  icon?: number | Source;
}
