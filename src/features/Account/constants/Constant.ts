import Screen from '../../../navigation/Screen';
import images from '../../../themes/Images';
import {AccountKeyProps, AccountProps} from './Account.props';

export const WORKSPACE_BLOCKS: AccountProps[] = [
  {
    key: AccountKeyProps.MyProjects,
    screenId: Screen.MyProjects,
    icon: images.ic_project
  },
  {
    key: AccountKeyProps.MyTasks,
    screenId: Screen.Profile,
    icon: images.ic_task
  },
];

export const ACCOUNT_BLOCKS: AccountProps[] = [
  {
    key: AccountKeyProps.Profile,
    screenId: Screen.Profile,
    icon: images.ic_personal
  },
  {
    key: AccountKeyProps.ChangePassword,
    screenId: Screen.Profile,
    icon: images.ic_password
  },
];

export const APP_BLOCKS: AccountProps[] = [
  {
    key: AccountKeyProps.Notification,
    screenId: Screen.Profile,
    icon: images.ic_notification
  },
  {
    key: AccountKeyProps.AppAppearance,
    screenId: null,
    icon: images.ic_setting
  },
  {
    key: AccountKeyProps.HelpAndSupport,
    screenId: Screen.Profile,
    icon: images.ic_guideline
  },
];
