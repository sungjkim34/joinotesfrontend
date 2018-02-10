import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { LoggedOutNavigator } from './components/LoggedOut/LoggedOutNavigator';
import { LoggedInNavigator } from './components/LoggedIn/LoggedInNavigator';
import { authUser } from './services/AuthService';
import { registerUser } from './services/AccountService';

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
    authUser(username, password).then(account => {
      if(account.length){
        this.setState({isLoggedIn: true, account: account[0], isLoading: false, error:''});
      }
      else {
        this.setState({error: 'Error - Wrong credentials.'});
      }
    });
  }

  register = (accountInfo) => {
    registerUser(accountInfo)
      .then(res => {
        console.log(res);
        // this.login(userInfo.username, userInfo.password);
      })
      .catch(err => this.setState({error: err.toString().replace('Error: ', '')}));
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
        <LoggedInNavigator screenProps={
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