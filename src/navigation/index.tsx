import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './HomeScreen';
import ScanScreen from './ScanScreen';
import ScanDetailScreen from './ScanDetailScreen';

const stackNavigator = createStackNavigator(
  {
    homeScreen: {
      screen: HomeScreen,
    },
    scanScreen: {
      screen: ScanScreen,
    },
    scanDetailScreen: {
      screen: ScanDetailScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default createAppContainer(stackNavigator);
