import React, {createContext, useContext} from 'react';
import {darkColors, lightColors} from '../themes/ThemeColors';
import {useSelector} from 'react-redux';
import {AppState} from '../redux/reducer';
import {actions as AppActions} from '../redux/app';
import {useAppDispatch} from '../redux/hook';

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
  const _isDark = useSelector((state: AppState) => state.app.isDark);
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
