import {AppRegistry} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';
import App from './src/App';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';

const Blitz = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Blitz);
