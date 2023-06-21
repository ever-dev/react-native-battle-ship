/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';

import React from 'react';
import {SafeAreaView, StatusBar, View, useColorScheme} from 'react-native';
import Toast from 'react-native-toast-message';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Game from './src/components/Game';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={{flex: 1}}>
          <Game />
          <Toast />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
