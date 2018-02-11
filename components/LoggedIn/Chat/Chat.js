import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Card, Button, Divider } from 'react-native-elements';
import openSocket from 'socket.io-client';
import { serverURL } from '../../../env';
import { getAllChat, deleteMessage } from '../../../services/ChatService';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      socket: openSocket(serverURL, { transports: ['websocket'] }),
      messages: [],
      messageText: undefined,
      width: undefined,
      height: undefined
    }

    console.ignoredYellowBox = [
      'Setting a timer'
    ];

    this.state.socket.on('sendMessage', message => {
      this.setState({ messages: [...this.state.messages, message.message] });
    });
  }

  componentWillMount() {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });
    getAllChat().then(messages => {
      this.setState({ messages });
    });
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
    this.state = {};
  }

  sendMessage = () => {

    const { id, firstName, lastName } = this.props.screenProps.account;

    const message = {
      accountId: id,
      firstName: firstName,
      lastName: lastName,
      messageText: this.state.messageText
    }

    this.state.socket.emit('sendMessage', message);
    this.setState({ messageText: '' });
  }

  deleteMessage = (messageId) => {
    deleteMessage(messageId).then(res => {
      this.setState({ messages: this.state.messages.filter(message => message.id !== messageId) });
    });
  }

  isRegisteredDisabled() {
    if (!this.state.messageText) {
      return true;
    }
    return false;
  }


  render() {

    const { height, width } = this.state;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <ScrollView style={{ margin: 20 }}>
            {
              this.state.messages.sort((a, b) => moment(b.messageDate) - moment(a.messageDate)).map((message, i) =>
                <View key={i} style={{ marginBottom: 5 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>{`${message.firstName} ${message.lastName}`}</Text>
                  <Text>{moment(message.messageDate).format('MMM DD, YYYY [at] hh:mma')}</Text>
                  <Text style={{ color: 'black' }}>{message.messageText}</Text>
                </View>
              )}
          </ScrollView>
        </View>
        <View style={{ alignContent: 'center' }}>
          <Divider style={{ marginVertical: 2, marginHorizontal: 15 }} />
          <TextInput onSubmitEditing={() => this.sendMessage()} value={this.state.messageText} style={{ borderWidth: 1, borderRadius: 3, margin: 10, borderColor: '#bfc0c0' }} width={width / 1.5} onChangeText={(messageText) => this.setState({ messageText })} placeholder='Enter message' />
          <Button disabled={this.isRegisteredDisabled()} icon={<Icon name='paper-plane' size={15} color='white' />} text='SEND' onPress={() => this.sendMessage()} buttonStyle={[styles.loginButton, { width: width / 2 }, this.isRegisteredDisabled() && { opacity: 0.5 }]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  loginButton: {
    // marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#5386E4",
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 100
  }
});