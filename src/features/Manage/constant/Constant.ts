import * as yup from 'yup';

import colors from '../../../themes/Colors';
import {SpacingDefault} from '../../../themes/Spacing';
import {CreateTaskFormProps, PriorityProps, PriorityTask, StatusProps, StatusTask, TasksStatusSearch, TimeProjectProps} from './Model.props';

export const ITEM_SIZE_SPACE = 18;
export const SPACING_BETWEEN_CARD = SpacingDefault.large;
export const ITEM_PROJECT_WIDTH = SpacingDefault.width - SPACING_BETWEEN_CARD * 2;

export const TASKS_BY_STATUS_WITH_SEARCH: TasksStatusSearch[] = [
  {
    title: 'All',
    key: 'All',
  },
  {
    title: 'To do',
    key: StatusTask.NotStartYet,
  },
  {
    title: 'Pending',
    key: StatusTask.Pending,
  },
  {
    title: 'In Progress',
    key: StatusTask.InProgress,
  },
  {
    title: 'Completed',
    key: StatusTask.Done,
  },
];

export const TASKS_BY_STATUS: TimeProjectProps[] = [
  {
    title: 'To do',
    icon: 'ic_today',
    key: StatusTask.NotStartYet,
  },
  {
    title: 'Pending',
    icon: 'ic_tomorrow',
    key: StatusTask.Pending,
  },
  {
    title: 'In Progress',
    icon: 'ic_week',
    key: StatusTask.InProgress,
  },
  {
    title: 'Completed',
    icon: 'ic_planned',
    key: StatusTask.Done,
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

export const initialCreateTaskForm: CreateTaskFormProps = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  priority: PriorityTask.LOW,
  project: undefined
};

export const validationCreateTaskSchema = yup.object({
  title: yup.string().required('Trường này bắt buộc'),
  project: yup.object(),
  description: yup.string(),
  startDate: yup.string(),
  endDate: yup.string(),
  priority: yup.string(),
});
