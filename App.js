import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { LoggedOutNavigator } from './components/LoggedOut/LoggedOutNavigator';
import { MainLoggedInNavigator } from './components/LoggedIn/MainLoggedInNavigator';
import { authUser } from './services/AuthService';
import { registerUser, toggleShowEnroll } from './services/AccountService';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      isLoading: false,
      account: {},
      error: ''
    }
    // this.state = {
    //     isLoggedIn: true,
    //     isLoading: false,
    //     account: {
    //       "id": 2,
    //       "username": "jay",
    //       "email": "jay@jay.com",
    //       "firstName": "Jay",
    //       "lastName": "Kim"
    //     },
    //     error: '',
    //   }
  }

  toggleEnrollOnly = () => {
    this.setState({account: {...this.state.account, showEnrolled: {...this.state.account.showEnrolled, data: [this.state.account.showEnrolled.data[0] === 0 ? 1 : 0]}}})
    toggleShowEnroll(this.state.account.id).then(res => {
      console.log(res);
    });
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
        this.login(accountInfo.username, accountInfo.password);
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
        <MainLoggedInNavigator screenProps={
          {
            logout: () => this.logout(),
            toggleEnrollOnly: () => this.toggleEnrollOnly(),
            account: this.state.account,
          }}/>
                :
        <LoggedOutNavigator screenProps={
          { 
            login: (username, password) => this.login(username, password),
            register: (account) => this.register(account),
            isLoading: this.state.isLoading,
            error: this.state.error
          }}/>
    );
  }
}