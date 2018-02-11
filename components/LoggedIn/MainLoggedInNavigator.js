import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Home from './Home';
import { LoggedInNavigator } from './LoggedInNavigator';
import Note from './Home/Note';
// import AddNote from './AddNote';

export const MainLoggedInNavigator = StackNavigator({
    Home: {
      screen: LoggedInNavigator,
    },
    Note: {
      screen: Note,
      navigationOptions: {
        title: 'Note',
        headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 15 }
      }
    },
    // AddNote: {
    //   screen: AddNote,
    //   navigationOptions: {
    //     title: 'Add Note',
    //     headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 15 }
    //   }
    // }
  },
  {
    headerMode: 'none',
    // labelStyle: {
    //   fontSize: 12,
    // }
});