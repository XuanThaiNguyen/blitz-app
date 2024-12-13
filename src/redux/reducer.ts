import {combineReducers} from '@reduxjs/toolkit';
import app from './app';
import user from './user';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

const persistedAppConfig = {
  key: 'appReducer',
  storage: AsyncStorage,
  whitelist: ['isFirstVisited', 'isDark'],
};

const persistedUserConfig = {
  key: 'userReducer',
  storage: AsyncStorage,
  whitelist: ['user'],
};

export const allReducers = combineReducers({
  app: persistReducer(persistedAppConfig, app),
  user: persistReducer(persistedUserConfig, user),
});

export type AppState = ReturnType<typeof allReducers>;
