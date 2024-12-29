import {IconTypes} from '../../../themes/Images';

export interface TimeProjectProps {
  title: string;
  color: string;
  total: number;
  timeEst: string;
  icon: IconTypes;
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
