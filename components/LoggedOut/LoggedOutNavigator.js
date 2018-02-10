
import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Login from './Login';
// import Register from './Register';

export const LoggedOutNavigator = StackNavigator({
    Home: {
      screen: Home
    },
    Login: {
      screen: Login
    },
    // Register: {
    //   screen: Register
    // }
  },
  {
    headerMode: 'none'
});