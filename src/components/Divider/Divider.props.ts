import {StyleSheet} from 'react-native';

type DividerSizeProps =
  | '100%'
  | '90%'
  | '80%'
  | number
  | typeof StyleSheet.hairlineWidth;

export interface DividerProps {
  /**
   * Background for divider
   * @default #bbb
   */
  color?: string;

  /**
   * Height of divider
   * @default 1
   */
  height?: DividerSizeProps | string;

  /**
   * Height of divider
   * @default 1
   */
  width?: DividerSizeProps;
}
