import React from 'react';
import {FlexAlignType, StyleProp, ViewProps, ViewStyle} from 'react-native';

type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type Position = 'absolute' | 'relative';

type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

type OverFlow = 'visible' | 'hidden' | 'scroll';
export interface BlockProps extends ViewProps {
  /**
   * flexWrap
   * @default nowrap
   */
  flexWrap?: FlexWrap;

  /**
   * flexGrow
   * @default undefined
   */
  flexGrow?: number | undefined;

  /**
   * display
   * @default undefined
   */
  display?: 'none' | 'flex' | undefined;

  /**
   * left of distance left
   * @default 0
   */
  left?: number | string;

  /**
   * right of distance right
   * @default 0
   */
  right?: number | string;

  /**
   * bottom of distance bottom
   * @default 0
   */
  bottom?: number | string;

  /**
   * top of distance top
   *  * @default 0
   */
  top?: number | string;

  /**
   * zIndex
   * @default 0
   */
  zIndex?: number;

  /**
   * Sets the overflow block.
   * @default 0
   */
  overflow?: OverFlow;

  /**
   * opacity of block
   * @default 0
   */
  opacity?: number;

  /**
   * Width of size block
   * @default 0
   */
  w?: string | number;

  /**
   * Height of size block
   * @default 0
   */
  h?: string | number;

  /**
   * Children for block
   * @default undefined
   */
  children?: React.ReactNode;

  /**
   * Set flex to 1
   * @default undefined
   */
  block?: boolean;

  /**
   * Set flex for block
   * @default undefined
   */
  flex?: number;

  /**
   * Set block to row
   * @default undefined
   */
  row?: boolean;

  /**
   * Set items to center according to column
   * @default undefined
   */
  alignCenter?: boolean;

  /**
   * Set items to center according to row
   * @default undefined
   */
  justifyCenter?: boolean;

  /**
   * Set items to center
   * @default undefined
   */
  center?: boolean;

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
   * padding
   * @default undefined
   */
  padding?: number;

  /**
   * padding
   * @default undefined
   */
  paddingHorizontal?: number;

  /**
   * padding
   * @default undefined
   */
  paddingVertical?: number;

  /**
   * using background color for block
   * @default undefined
   */
  bgColor?: string;

  /**
   * borderRadius
   * @default undefined
   */
  borderRadius?: number;

  /**
   * borderWidth
   * @default undefined
   */
  borderWidth?: number;

  /**
   * borderWidth
   * @default undefined
   */
  borderStyle?: 'solid' | 'dotted' | 'dashed';

  /**
   * borderBottomWidth
   * @default undefined
   */
  borderBottomWidth?: number;

  /**
   * borderBottomColor
   * @default undefined
   */
  borderBottomColor?: string;

  /**
   * borderColor
   * @default undefined
   */
  borderColor?: string;

  /**
   * alignItems
   * @default undefined
   */
  alignItems?: AlignItems;

  /**
   * alignSelf
   * @default undefined
   */
  alignSelf?: 'auto' | FlexAlignType | undefined;

  /**
   * justifyContent
   * @default undefined
   */
  justifyContent?: JustifyContent;

  /**
   * Overwrite style for block
   * @default undefined
   */
  styleOverride?: StyleProp<ViewStyle>;

  /**
   * set children to center
   * @default undefined
   */
  selfCenter?: boolean;

  /**
   * set preset shadow for block
   * @default undefined
   */
  shadow?: boolean;

  /**
   * Overwrite shadow style for block
   * @default undefined
   */
  shadowConfig?: object;

  /**
   * Config position
   * @default undefined
   */
  position?: Position;
}
