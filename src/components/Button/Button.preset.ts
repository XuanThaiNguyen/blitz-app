import {StyleSheet} from 'react-native';
import colors from '../../themes/Colors';

export const primaryTextChecker = ['primary', 'primaryChip'];
export const outlineTextChecker = ['outline', 'outlineChip'];

export type ButtonPresetProps = {
  primary: any;
  secondary: any;
};

export const stylesView = (): any =>
  StyleSheet.create({
    primary: {
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      borderRadius: 100,
    },
    secondary: {
      backgroundColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      borderRadius: 100,
    },
  });

export type ButtonPresetNames = keyof ButtonPresetProps;
