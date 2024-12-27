import {StyleSheet} from 'react-native';

import {FontDefault} from '../../themes/Font';
import {FontSizeDefault} from './TypoSize';

type PresetProps = {
  b32: any;
  b24: any;
  r24: any;
  b20: any;
  r20: any;
  b18: any;
  r18: any;
  b16: any;
  r16: any;
  b14: any;
  r14: any;
  r12: any;
  b10: any;
  r10: any;
};

export const TypoPresets = (): PresetProps =>
  StyleSheet.create({
    b32: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_32,
    },
    b24: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_24,
    },
    r24: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_24,
    },
    b20: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_20,
    },
    r20: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_20,
    },
    b18: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_18,
    },
    r18: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_18,
    },
    b16: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_16,
    },
    r16: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_16,
    },
    b14: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_14,
    },
    r14: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_14,
    },
    r12: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_12,
    },
    b10: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_10,
    },
    r10: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_10,
    },
  });

export type TypoPresetNames = keyof PresetProps;
