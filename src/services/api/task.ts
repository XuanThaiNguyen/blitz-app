import http from '../../utils/http';
import APIs from './APIs';

export const createTask = async (params: any) => {
  return http.post(APIs.CREATE_TASK, params);
};

export const getTasks = async (params?: any) => {
  return http.get(APIs.GET_TASKS, params);
};
