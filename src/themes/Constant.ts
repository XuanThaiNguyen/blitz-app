import {Platform} from 'react-native';

import colors from './Colors';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const NONE_VALUE = '-';

export const calendarHeaderWeekDay = {
  'stylesheet.calendar.header': {
    dayTextAtIndex0: {
      color: colors.gray,
      textTransform: 'uppercase',
    },
    dayTextAtIndex1: {
      color: colors.gray,
      textTransform: 'uppercase',
    },
    dayTextAtIndex2: {
      color: colors.gray,
      textTransform: 'uppercase',
    },
    dayTextAtIndex3: {
      color: colors.gray,
      textTransform: 'uppercase',
    },
    dayTextAtIndex4: {
      color: colors.gray,
      textTransform: 'uppercase',
    },
    dayTextAtIndex5: {
      color: colors.gray,
      textTransform: 'uppercase',
    },
    dayTextAtIndex6: {
      color: colors.gray,
      textTransform: 'uppercase',
    },
  },
};
