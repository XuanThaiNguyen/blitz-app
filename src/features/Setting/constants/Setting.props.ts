import Screen from '../../../navigation/Screen';

export enum SettingKeyProps {
  Profile = 'Profile',
  AppAppearance = 'App Appearance',
}

export interface SettingProps {
  key: SettingKeyProps;
  screenId: Screen | null
}
