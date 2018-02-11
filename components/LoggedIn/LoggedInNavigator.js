import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Chat from './Chat/Chat';

export const LoggedInNavigator = TabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        // headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 0},
        // headerTitle: 'Home',
        tabBarIcon: ({tintColor}) => <Icon name="home" color={tintColor} size={24}/>
      }
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 0 },
        headerTitle: 'Chat',
        tabBarIcon: ({tintColor}) => <Icon name="commenting" color={tintColor} size={24}/>
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerStyle: { marginTop: (Platform.OS === 'ios') ? 0 : 0 },
        headerTitle: 'Profile',
        tabBarIcon: ({tintColor}) => <Icon name="user" color={tintColor} size={24}/>
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#5386E4',
      inactiveTintColor: '#b5b5b5',
      showIcon: 'true',
      labelStyle: {
        fontSize: 10,
      },
      style: {
        backgroundColor: '#fff',
        height: (Platform.OS === 'ios') ? 50 : 60,
      },
      indicatorStyle: {
        backgroundColor: '#5386E4'
      }
    }
});