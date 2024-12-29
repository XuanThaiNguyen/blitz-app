import {Platform} from 'react-native';

import colors from './Colors';

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

export const calendarHeaderWeekDay = {
  'stylesheet.calendar.header': {
    dayTextAtIndex0: {
      color: colors.gray1,
      textTransform: 'uppercase',
    },
    dayTextAtIndex1: {
      color: colors.gray1,
      textTransform: 'uppercase',
    },
    dayTextAtIndex2: {
      color: colors.gray1,
      textTransform: 'uppercase',
    },
    dayTextAtIndex3: {
      color: colors.gray1,
      textTransform: 'uppercase',
    },
    dayTextAtIndex4: {
      color: colors.gray1,
      textTransform: 'uppercase',
    },
    dayTextAtIndex5: {
      color: colors.gray1,
      textTransform: 'uppercase',
    },
    dayTextAtIndex6: {
      color: colors.gray1,
      textTransform: 'uppercase',
    },
  },
};
