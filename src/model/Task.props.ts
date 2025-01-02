import {PriorityTask} from '../features/Manage/constant/Model.props';

export interface TaskProps {
  _id: string;
  title: string;
  timing: {
    startDate: Date;
    endDate: Date;
    estimation: number;
  };
  priority: PriorityTask;
  status: string;
}
