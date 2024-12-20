import React from 'react';
import {
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  StyleProp,
  Insets,
} from 'react-native';

import {ButtonPresetNames} from './Button.preset';
import {TypoPresetNames} from '../Typo/Typo.preset';

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Set flex to 1
   * @default undefined
   */
  block?: boolean;

  /**
   * Set items to center
   * @default undefined
   */
  center?: boolean;
  /**
   *
   * Set items to self center
   * @default undefined
   */
  selfCenter?: boolean;

  /**
   * isDebounce is use debounce onPress
   * @default undefined
   */
  isDebounce?: boolean;

  /**
   * debounceTime is use set duration debounce
   * @default 300ms
   */
  debounceTime?: number;

  /**
   * onPress click event
   * @default undefined
   */
  onPress?: () => void;

  /**
   * Text which is looked up via i18n.
   * @default undefined
   */
  tx?: string;

  /**
   * Using text instead i18n
   * @default undefined
   */
  text?: string;
  /**
   * Display icon
   * @default undefined
   */
  icon?: React.ReactElement;

  /**
   * disabled highlight when disabled enable
   * @default undefined
   */
  disabled?: boolean;

  /**
   * padding
   * @default undefined
   */
  padding?: string | number;

  /**
   * Overwrite style for button
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Overwrite style for text
   * @default undefined
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Preset for button
   * @default default
   */
  preset?: ButtonPresetNames;

  /**
   * Preset for text
   * @default default
   */
  textPreset?: TypoPresetNames;
  /**
   * Using color for text
   * @default undefined
   */
  textColor?: string;

  /**
   * Using color for button background color
   * @default undefined
   */
  buttonColor?: string;

  /**
   * margin top
   * @default undefined
   */
  mTop?: number | string;

  /**
   * margin bottom
   * @default undefined
   */
  mBottom?: number;

  /**
   * margin left
   * @default undefined
   */
  mLeft?: number;

  /**
   * margin right
   * @default undefined
   */
  mRight?: number;

  /**
   * margin horizontal
   * @default undefined
   */
  mHoz?: number;

  /**
   * margin vertical
   * @default undefined
   */
  mVer?: number;

  /**
   * padding top
   * @default undefined
   */
  pTop?: number;

  /**
   * padding bottom
   * @default undefined
   */
  pBottom?: number;

  /**
   * padding left
   * @default undefined
   */
  pLeft?: number;

  /**
   * padding right
   * @default undefined
   */
  pRight?: number;

  /**
   * padding horizontal
   * @default undefined
   */
  pHoz?: number;

  /**
   * padding vertical
   * @default undefined
   */
  pVer?: number;

  /**
   * margin
   * @default undefined
   */
  margin?: number;

  /**
   * Children for button
   * @default undefined
   */
  children?: React.ReactNode;

  /**
   * Actual width
   * @default undefined
   */
  width?: number | string;

  /**
   * Actual height
   * @default undefined
   */
  height?: string | number;

  /**
   * Loading
   * @default undefined
   */
  loading?: boolean;

  /**
   * Loading
   * @default undefined
   */
  loadingColor?: string;

  /**
   * Area touch
   * @default undefined
   */
  hitSlop?: Insets | number | undefined;

  /**
   * Using color for button background color pressed
   * @default undefined
   */
  pressedColor?: string;

  /**
   * Using color disabled for text
   * @default undefined
   */
  isUseColorDisabledForText?: boolean;
}
