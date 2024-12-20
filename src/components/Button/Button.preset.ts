import {StyleSheet} from 'react-native';
import colors from '../../themes/Colors';
import {SpacingDefault} from '../../themes/Spacing';

export const primaryTextChecker = ['primary', 'primaryChip'];
export const outlineTextChecker = ['outline', 'outlineChip'];

export type ButtonPresetProps = {
  primary: any;
  outline: any;
  primaryChip: any;
  outlineChip: any;
};

export const stylesView = (): ButtonPresetProps =>
  StyleSheet.create({
    primary: {
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      borderRadius: 50,
      paddingHorizontal: 32,
    },
    outline: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.gray,
      paddingVertical: 2,
      paddingHorizontal: 12,
    },
    primaryChip: {
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
      paddingHorizontal: SpacingDefault.normal,
      borderRadius: 24,
    },
    outlineChip: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
      paddingHorizontal: SpacingDefault.normal,
      borderRadius: 24,
    },
  });

export type ButtonPresetNames = keyof ButtonPresetProps;
