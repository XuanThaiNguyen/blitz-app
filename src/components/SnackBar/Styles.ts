import {StyleSheet} from 'react-native';

import {Theme} from '../../context/ThemeProvider';
import colors from '../../themes/Colors';
import {BG_SUCCESS} from './Constants';

export const useStyles = ((theme: Theme) => StyleSheet.create({
  container: {
    minHeight: 50,
    paddingHorizontal: 15,
    zIndex: 10000000
  },
  itemBar: {
    borderLeftWidth: 3,
    borderLeftColor: BG_SUCCESS,
    paddingHorizontal: 15,
  },
  defaultView: {
    backgroundColor: theme?.background,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.46,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 6,
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  block: {
    flex: 1,
  },
  height: {
    height: 52,
  },
}));
