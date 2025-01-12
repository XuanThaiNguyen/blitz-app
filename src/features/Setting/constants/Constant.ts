import Screen from '../../../navigation/Screen';
import images from '../../../themes/Images';
import {SettingKeyProps, SettingProps} from './Setting.props';

export const WORKSPACE_BLOCKS: SettingProps[] = [
  {
    key: SettingKeyProps.MyProjects,
    screenId: Screen.Profile,
    icon: images.ic_project
  },
  {
    key: SettingKeyProps.MyTasks,
    screenId: Screen.Profile,
    icon: images.ic_task
  },
];

export const ACCOUNT_BLOCKS: SettingProps[] = [
  {
    key: SettingKeyProps.Profile,
    screenId: Screen.Profile,
    icon: images.ic_personal
  },
  {
    key: SettingKeyProps.ChangePassword,
    screenId: Screen.Profile,
    icon: images.ic_password
  },
];

export const APP_BLOCKS: SettingProps[] = [
  {
    key: SettingKeyProps.Notification,
    screenId: Screen.Profile,
    icon: images.ic_notification
  },
  {
    key: SettingKeyProps.AppAppearance,
    screenId: null,
    icon: images.ic_setting
  },
  {
    key: SettingKeyProps.HelpAndSupport,
    screenId: Screen.Profile,
    icon: images.ic_guideline
  },
];
