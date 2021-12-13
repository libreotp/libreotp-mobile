import React from 'react';
import {NativeModules} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {I18nProvider} from '@lingui/react';
import {i18n} from '@lingui/core';
import {en, fr} from 'make-plural/plurals';
import Home from './containers/Home';
import Scan from './containers/Scan';
import {messages as catalogEn} from './locale/en/messages';
import {messages as catalogFr} from './locale/fr/messages';

const Stack = createNativeStackNavigator();

i18n.loadLocaleData('en', {plurals: en});
i18n.loadLocaleData('fr', {plurals: fr});
i18n.load('en', catalogEn);
i18n.load('fr', catalogFr);
i18n.activate(
  NativeModules.I18nManager.localeIdentifier.substring(0, 2) || 'en',
);

const App = () => {
  return (
    <I18nProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Scan"
            component={Scan}
            options={{
              headerTitle: '',
              headerStyle: {
                backgroundColor: '#3f51b5',
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nProvider>
  );
};

export default App;
