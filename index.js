import {AppRegistry} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';
import App from './src/App';

const Blitz = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => Blitz);
