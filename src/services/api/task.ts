import http from '../../utils/http';
import APIs from './APIs';

export const createTask = async (params: any) => {
  return http.post(APIs.CREATE_TASK, params);
};

export const getTasks = async (params?: any) => {
  return http.get(APIs.GET_TASKS, params);
};

export const getTaskById = async (taskId: string) => {
  return http.get(APIs.GET_TASK_BY_ID.replace(':taskId', taskId));
};

export const updateTaskById = async (taskId: string, params: any) => {
  return http.patch(APIs.GET_TASK_BY_ID.replace(':taskId', taskId), params);
};

export const deleteTaskById = async (taskId: string) => {
  return http.delete(APIs.GET_TASK_BY_ID.replace(':taskId', taskId));
};

export const searchTasks = async (search: string) => {
  return http.get(`${APIs.GET_TASKS}?query=${search}`);
};
