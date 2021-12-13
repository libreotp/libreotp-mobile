import bugsnag from "./src/bugsnag";

import React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/App';

const ErrorBoundary = bugsnag.getPlugin('react').createErrorBoundary(React)

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3f51b5',
    accent: '#3f51b5',
  },
};

export default function MyApp() {
  return (
    <ErrorBoundary>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </ErrorBoundary>
  );
}

AppRegistry.registerComponent(appName, () => MyApp);
