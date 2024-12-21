import React from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from './context/ThemeProvider';
import Modal from './components/Modal';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Modal />
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
