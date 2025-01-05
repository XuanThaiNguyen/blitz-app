import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {name as appName} from './app.json';
import App from './src/App';
import {persistor, store} from './src/redux/store';
import './src/utils/ReactotronConfig';

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
