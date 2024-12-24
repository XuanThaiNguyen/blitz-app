import Screen from '../../../navigation/Screen';
import {SettingKeyProps, SettingProps} from './Setting.props';

export const ACCOUNT_BLOCKS: SettingProps[] = [
  {
    key: SettingKeyProps.Profile,
    screenId: Screen.Profile,
  },
];

export const APP_BLOCKS: SettingProps[] = [
  {
    key: SettingKeyProps.AppAppearance,
    screenId: '',
  },
];
