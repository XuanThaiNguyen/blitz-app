import {createSlice} from '@reduxjs/toolkit';

export interface TagModel {
  _id: string;
  title: string;
  color: string;
}

interface User {
  accountSetting: {
    isPrivateAccount: boolean;
    theme: 'light' | 'dark';
  };
  avatar: string;
  email: string;
  firstname: string;
  lastname: string;
  fullname: string;
  jwt: {
    expiredAt: string;
    token: string;
  };
  profileInfo: {
    locale: 'vi' | 'en';
    phoneNumber: string[];
    tags: Record<string, TagModel>;
  };
  signinMethod: 'Google' | 'Facebook';
  _id: string;
}
interface InitialUserProps {
  user: User | null;
}

const initialState: InitialUserProps = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload;
    },
  },
});

export const {actions, reducer: user} = userSlice;

export default user;
