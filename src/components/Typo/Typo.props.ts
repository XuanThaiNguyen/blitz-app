import React from 'react';
import {StyleProp, TextProps as TextProperties, TextStyle} from 'react-native';

import {TypoPresetNames} from './Typo.preset';
import {FontFamily} from '../../themes/Font';
import {FontSizeTypes} from './TypoSize';

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;
export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';

export interface TypoProps extends TextProperties {
  fontStyle?: 'normal' | 'italic';

  letterSpacing?: number;

  lineHeight?: number;

  /**
   * Children of text
   * @default undefined
   */
  children?: React.ReactNode;

  /**
   * bold fontWeight: 500
   * @default undefined
   */
  regular?: boolean;

  /**
   * solid fontWeight: 400
   * @default undefined
   */
  solid?: boolean;

  /**
   * bold fontWeight: bold
   * @default undefined
   */
  bold?: boolean;

  /**
   * semiBold fontWeight: 600
   * @default undefined
   */
  semiBold?: boolean;

  /**
   * Text which is looked up via i18n.
   * @default undefined
   */
  tx?: string;

  /**
   * Option of i18n
   * @default undefined
   */
  txOptions?: any;

  /**
   * Using text string instead i18n
   * @default undefined
   */
  text?: string;

  /**
   * Enable to using {flex:1}
   * @default undefined
   */
  flex?: boolean;

  /**
   * Overwrite font size
   * @default FONT_14
   */
  fontSize?: FontSizeTypes;

  /**
   * Overwrite font weight
   * @default undefined
   */
  fontWeight?: FontWeight;

  /**
   * Overwrite font family
   * @default undefined
   */
  fontFamily?: FontFamily;

  /**
   * Using color
   * @default undefined
   */
  color?: string;

  /**
   * Set true for using textAlign = 'center'
   * @default undefined
   */
  center?: boolean;

  /**
   * Overwrite textAlign
   * @default undefined
   */
  textAlign?: TextAlign;

  /**
   * Overwrite textTransform
   * @default undefined
   */
  textTransform?: TextTransform;

  /**
   * Overwrite style of text component
   * @default undefined
   */
  style?: StyleProp<TextStyle>;
  /**
   * Preset for text
   * @default default
   */
  preset?: TypoPresetNames;

  /**
   * Disabled style apply for text
   * @default default
   */
  applyDisabledStyle?: boolean;
}
