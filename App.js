import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { LoggedOutNavigator } from './components/LoggedOut/LoggedOutNavigator';
import { authUser } from './services/AuthService';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      isLoading: false,
      account: {},
      student: {},
      error: ''
    }
  }

  login = (username, password) => {
    this.setState({isLoading: true});
    authUser(username, password).then(res => {
      console.log(res);
      // this.setState({isLoggedIn: res});
    });
  }

  register = (accountInfo) => {
    console.log(accountInfo);
    // register(accountInfo.username, accountInfo.email, accountInfo.password, accountInfo.firstName, accountInfo.lastName)
    //   .then(res => {
    //     AuthService.updateUser(res.uid, userInfo);
    //     this.login(userInfo.username, userInfo.password);
    //   })
    //   .catch(err => this.setState({error: err.toString().replace('Error: ', '')}));
  }

  logout = () => {
    // Log out of mysql??? Should we hold logged in state?
    this.setState({
      ...this.state,
      isLoggedIn: false
    });
  }

  render() {
    return (
      this.state.isLoggedIn ?
        <MainLoggedInNavigator screenProps={
          {
            // editUser: (editedField) => this.editUser(editedField),
            logout: () => this.logout(),
            account: this.state.account,
          }}/>
                :
        <LoggedOutNavigator screenProps={
          { 
            login: (username, password) => this.login(username, password),
            register: (account) => this.register(account),
            // clearError: () => this.clearError(),
            isLoading: this.state.isLoading,
            error: this.state.error
          }}/>
    );
  }
}