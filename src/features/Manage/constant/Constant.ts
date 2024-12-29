import colors from '../../../themes/Colors';
import {PriorityProps, PriorityTask, StatusProps, StatusTask, TimeFilterKey, TimeProjectProps} from './Model.props';

export const ITEM_SIZE_SPACE = 18;

export const TIME_PROJECT_DEFAULT: TimeProjectProps[] = [
  {
    title: 'Today',
    color: colors.green,
    total: 4,
    timeEst: '6h 25m',
    icon: 'ic_today',
    key: TimeFilterKey.TODAY,
  },
  {
    title: 'Tomorrow',
    color: colors.blue,
    total: 4,
    timeEst: '6h 40m',
    icon: 'ic_tomorrow',
    key: TimeFilterKey.TOMORROW,
  },
  {
    title: 'This week',
    color: colors.purple,
    total: 10,
    timeEst: '13h 20m',
    icon: 'ic_week',
    key: TimeFilterKey.WEEK,
  },
  {
    title: 'Planned',
    color: colors.orange,
    total: 18,
    timeEst: '20h 50m',
    icon: 'ic_planned',
    key: TimeFilterKey.PLANNED,
  },
];

export const PRIORITIES: PriorityProps[] = [
  {
    key: PriorityTask.LOW,
    value: 'Low Priority',
    color: colors.priorityLow,
  },
  {
    key: PriorityTask.MEDIUM,
    value: 'Medium Priority',
    color: colors.priorityMedium,
  },
  {
    key: PriorityTask.HIGH,
    value: 'High Priority',
    color: colors.priorityHigh,
  },
  {
    key: PriorityTask.Critical,
    value: 'Critical Priority',
    color: colors.priorityCritical,
  },
];

export const STATUSES: StatusProps[] = [
  {
    key: StatusTask.NotStartYet,
    value: 'Not Start Yet',
  },
  {
    key: StatusTask.Pending,
    value: 'Pending',
  },
  {
    key: StatusTask.InProgress,
    value: 'In Progress',
  },
  {
    key: StatusTask.Done,
    value: 'Done',
  },
  {
    key: StatusTask.Archived,
    value: 'Archived',
  },
];

export const COLORS = [
  '#F54336',
  '#EA1D61',
  '#9D28AC',
  '#673AB3',
  '#3F51B2',
  '#1A96F0',
  '#00A9F2',
  '#00BCD3',
  '#009689',
  '#4AAF57',
  '#8BC255',
  '#CDDC4C',
  '#FFEB4F',
  '#FFC02D',
  '#FF981F',
  '#FF5726',
  '#7A5548',
  '#607D8A',
  '#FF6347',
  '#02FFB9',
];
