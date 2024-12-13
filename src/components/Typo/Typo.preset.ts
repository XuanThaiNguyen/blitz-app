import {StyleSheet} from 'react-native';
import {FontSizeDefault} from './TypoSize';
import {FontDefault} from '../../themes/Font';

type PresetProps = {
  body12: any;
  body12B: any;
  body14: any;
  body14B: any;
  body16: any;
  body16B: any;
  body18: any;
  body18B: any;
  body20: any;
  body20B: any;
  body22B: any;
  body24B: any;
  body28B: any;
};

export const TypoPresets = (): PresetProps =>
  StyleSheet.create({
    body12: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_12,
    },
    body12B: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_12,
    },
    body14: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_14,
    },
    body14B: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_14,
    },
    body16: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_16,
    },
    body16B: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_16,
    },
    body18: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_18,
    },
    body18B: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_18,
    },
    body20: {
      fontFamily: FontDefault.Regular,
      fontSize: FontSizeDefault.FONT_20,
    },
    body20B: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_20,
    },
    body22B: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_22,
    },
    body24B: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_24,
    },
    body28B: {
      fontFamily: FontDefault.Bold,
      fontSize: FontSizeDefault.FONT_28,
    },
  });

export type TypoPresetNames = keyof PresetProps;
