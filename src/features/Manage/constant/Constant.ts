import colors from '../../../themes/Colors';
import {TimeProjectProps} from './Model.props';

export const ITEM_SIZE_SPACE = 18;

export const TIME_PROJECT_DEFAULT: TimeProjectProps[] = [
  {
    title: 'Today',
    color: colors.green,
    total: 4,
    timeEst: '6h 25m',
    icon: 'ic_today',
  },
  {
    title: 'Tomorrow',
    color: colors.blue,
    total: 4,
    timeEst: '6h 40m',
    icon: 'ic_tomorrow',
  },
  {
    title: 'This week',
    color: colors.purple,
    total: 10,
    timeEst: '13h 20m',
    icon: 'ic_week',
  },
  {
    title: 'Planned',
    color: colors.orange,
    total: 18,
    timeEst: '20h 50m',
    icon: 'ic_planned',
  },
];
