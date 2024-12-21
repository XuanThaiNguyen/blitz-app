import {IconTypes} from '../../../themes/Images';

export interface TimeProjectProps {
  title: string;
  color: string;
  total: number;
  timeEst: string;
  icon: IconTypes;
}

export enum PriorityTask {
  NO = 'NO',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface PriorityProps {
  key: PriorityTask;
  value: string;
  color: string;
}
