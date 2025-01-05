import http from '../../utils/http';
import APIs from './APIs';

export const getProjects = async (params?: any) => {
  return http.get(APIs.GET_PROJECTS, params);
};

export const createProject = async (params: any) => {
  return http.post(APIs.CREATE_PROJECT, params);
};
