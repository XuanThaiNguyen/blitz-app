import {createSlice} from '@reduxjs/toolkit';

interface InitialAppProps {
  isFirstVisited: boolean;
  isDark: boolean;
}

const initialState: InitialAppProps = {
  isFirstVisited: true,
  isDark: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setIsFirstVisited: (state, {payload}) => {
      state.isFirstVisited = payload;
    },
    setIsDark: (state, {payload}) => {
      state.isDark = payload;
    },
  },
});

export const {actions, reducer: app} = appSlice;

export default app;
