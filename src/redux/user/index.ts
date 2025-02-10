import {createSlice} from '@reduxjs/toolkit';

import {ProjectProps} from './../../model/Project.props';

export interface TagModel {
  _id: string;
  title: string;
  color: string;
}

export interface User {
  accountSetting: {
    isPrivateAccount: boolean;
    theme: 'light' | 'dark';
  };
  jwt: string;
  profileInfo: {
    avatar: string;
    email: string;
    firstname: string;
    lastname: string;
    fullname: string;
    locale: 'vi' | 'en';
    phoneNumber: string[];
    tags: Record<string, TagModel>;
  };
  signinMethod: 'Google' | 'Facebook';
  _id: string;
}
interface InitialUserProps {
  user: User | null;
  searchHistories: string[];
  projects: ProjectProps[];
  defaultProject: ProjectProps | null;
}

const initialState: InitialUserProps = {
  user: null,
  searchHistories: [],
  projects: [],
  defaultProject: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload;
    },
    setSearchHistories: (state, {payload}) => {
      if (state.searchHistories.length > 4) {
        state.searchHistories.pop();
      }
      state.searchHistories.unshift(payload);
    },
    deleteSearchHistories: (state, {payload}) => {
      const payloadIndex = state.searchHistories.findIndex(item => item === payload);
      if (payloadIndex !== -1) {
        state.searchHistories.splice(payloadIndex, 1);
      }
    },
    setProjects: (state, {payload}) => {
      state.projects = payload;
    },
    setDefaultProject: (state, {payload}) => {
      state.defaultProject = payload;
    },
  },
});

export const {actions, reducer: user} = userSlice;

export default user;
