import React, {createContext, useContext} from 'react';

import {actions as AppActions} from '../redux/app';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {AppState} from '../redux/reducer';
import {darkColors, lightColors} from '../themes/ThemeColors';

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
  isDark: boolean;
  theme: Theme;
  setScheme: (theme: ThemeType) => void;
}

export type Theme = typeof lightColors;

export const ThemeContext = createContext<ThemeContextProps>({
  isDark: false,
  theme: lightColors,
  setScheme: () => {
    //
  },
});

export interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({children}: ThemeContextProviderProps) => {
  const _isDark = useAppSelector((state: AppState) => state.app.isDark);
  const dispatch = useAppDispatch();

  const defaultTheme = {
    isDark: _isDark,
    theme: _isDark ? darkColors : lightColors,
    setScheme: (scheme: ThemeType) =>
      dispatch(AppActions.setIsDark(scheme === 'dark')),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
