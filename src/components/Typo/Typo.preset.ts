import {StyleSheet} from 'react-native';
import {FontSizeDefault} from './TypoSize';
import {FontDefault} from '../../themes/Font';

type PresetProps = {
  b32: any;
  b24: any;
  m20: any;
  r18: any;
  m18: any;
  s18: any;
  b16: any;
  r16: any;
  b14: any;
  sb14: any;
  r14: any;
};

export const TypoPresets = (): PresetProps =>
  StyleSheet.create({
    b32: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_32,
      lineHeight: 51.2,
    },
    b24: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_24,
      lineHeight: 38.4,
    },
    m20: {
      fontFamily: FontDefault.Medium,
      fontSize: FontSizeDefault.FONT_20,
      lineHeight: 32,
    },
    r18: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_18,
      lineHeight: 28.8,
    },
    m18: {
      fontFamily: FontDefault.Medium,
      fontSize: FontSizeDefault.FONT_18,
      lineHeight: 28.8,
    },
    s18: {
      fontFamily: FontDefault.Semibold,
      fontSize: FontSizeDefault.FONT_18,
      lineHeight: 28.8,
    },
    b16: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_16,
      lineHeight: 25.6,
    },
    r16: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_16,
      lineHeight: 25.6,
    },
    b14: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_14,
    },
    sb14: {
      fontFamily: FontDefault.Semibold,
      fontSize: FontSizeDefault.FONT_14,
    },
    r14: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_14,
    },
  });

export type TypoPresetNames = keyof PresetProps;
