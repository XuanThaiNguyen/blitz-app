import http from '../../utils/http';
import APIs from './APIs';

export const getProjects = async (params?: any) => {
  return http.get(APIs.GET_PROJECTS, params);
};

export const createProject = async (params: any) => {
  return http.post(APIs.CREATE_PROJECT, params);
};

export const getProjectDetailById = async (projectId: string) => {
  return http.get(APIs.GET_PROJECT_BY_ID.replace(':projectId', projectId));
};

export const updateProjectById = async (projectId: string, params: any) => {
  return http.patch(APIs.GET_PROJECT_BY_ID.replace(':projectId', projectId), params);
};