import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoggedInNavigator } from './LoggedInNavigator';
import Note from './Home/Note';
import NoteDetail from './Home/NoteDetail';
import AddNote from './Home/AddNote';

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
    NoteDetail: {
        screen: NoteDetail,
        navigationOptions: {
          title: 'NoteDetail',
          headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 15 }
        }
      },
    AddNote: {
      screen: AddNote,
      navigationOptions: {
        title: 'Add Note',
        headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 15 }
      }
    }
  },
  {
    headerMode: 'none',
    // labelStyle: {
    //   fontSize: 12,
    // }
});