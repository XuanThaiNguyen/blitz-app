import {Platform} from 'react-native';

export interface MeasureObject {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const initMeasure: MeasureObject = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  pageX: 0,
  pageY: 0,
};
