import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface SnackBarProps {
  borderLeftColorInfo?: string;
  borderLeftColorSuccess?: string;
  borderLeftColorError?: string;
  borderLeftColorWarn?: string;
  borderLeftColorDefault?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  renderItem?: React.ReactElement;
}

export type TypeMessage = 'success' | 'error' | 'info' | 'warn' | 'default';

export type PositionMessage = 'top' | 'bottom' | 'top_under_header';

export type Item = {
  id: number;
  msg?: string;
  type: TypeMessage;
  interval: number;
  position?: PositionMessage;
  isIncludedBottomHeight?: boolean;
  icon?: React.ReactElement;
  rightChild?: any;
  showRightChild?: any;
  disableHeight?: boolean;
  pVer?: number;
  iconColor?: string | undefined;
  bgTooltip?: string;
};
export interface SnackBarItemProps
  extends Pick<
    SnackBarProps,
    | 'borderLeftColorInfo'
    | 'borderLeftColorSuccess'
    | 'borderLeftColorError'
    | 'borderLeftColorWarn'
    | 'borderLeftColorDefault'
    | 'contentContainerStyle'
    | 'textStyle'
    | 'renderItem'
  > {
  item: Item;
  onPop: (item: Item) => void;
  isIncludedBottomHeight: boolean;
}
