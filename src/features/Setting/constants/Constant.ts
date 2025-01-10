import Screen from '../../../navigation/Screen';
import images from '../../../themes/Images';
import {SettingKeyProps, SettingProps} from './Setting.props';

export const ACCOUNT_BLOCKS: SettingProps[] = [
  {
    key: SettingKeyProps.Profile,
    screenId: Screen.Profile,
    icon: images.ic_personal
  },
];

export const APP_BLOCKS: SettingProps[] = [
  {
    key: SettingKeyProps.AppAppearance,
    screenId: '',
    icon: images.ic_setting
  },
];
