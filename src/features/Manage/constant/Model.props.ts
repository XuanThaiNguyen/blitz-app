import {IconTypes} from '../../../themes/Images';

export enum TimeFilterKey {
  TODAY = 'today',
  TOMORROW = 'tomorrow',
  WEEK = 'week',
  PLANNED = 'planned',
}

export interface TimeProjectProps {
  title: string;
  icon: IconTypes;
  key: StatusTask;
}

export enum PriorityTask {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  Critical = 'Critical'
}

export interface PriorityProps {
  key: PriorityTask;
  value: string;
  color: string;
}

export enum StatusTask {
  NotStartYet = 'NotStartYet',
  InProgress = 'InProgress',
  Pending = 'Pending',
  Done = 'Done',
  Archived = 'Archived',
}

export interface StatusProps {
  key: StatusTask;
  value: string;
}

export interface CreateTaskFormProps {
  title: string;
  description?: string;
}
