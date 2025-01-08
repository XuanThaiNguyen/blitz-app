import {PriorityTask, StatusTask} from '../features/Manage/constant/Model.props';
import {User} from '../redux/user';

export interface TaskProps {
  _id: string;
  title: string;
  timing: {
    startDate: Date;
    endDate: Date;
    estimation: number;
  };
  description?: string;
  priority: PriorityTask;
  status: StatusTask;
  projectId: string;
  subTasks?: TaskProps[];
  additionalInfo?: any[];
  assigneeInfo: User[];
}
