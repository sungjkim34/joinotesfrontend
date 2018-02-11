import React, {Component} from 'react';
import { Dimensions, StyleSheet, Text, View, Switch } from 'react-native';
import { Card, Button, Divider } from 'react-native-elements';
// import { Switch } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAccountCount, getEnrollmentCount, getNoteCount } from '../../../services/AccountService';

export default class Profile extends Component {
  constructor(){
    super();
    this.state = {
      width: undefined,
      height: undefined,
      noteCount: 0,
      enrollmentCount: 0,
      accountCount: 0,
      showEnrolledOnly: false
    }
  }

  componentWillMount() {
    const { width, height } = Dimensions.get('window');
    this.setState({ width, height });

    const accountId = this.props.screenProps.account.id;
    getEnrollmentCount(accountId).then(noteCount => {
      this.setState({noteCount});
    });
    getNoteCount(accountId).then(enrollmentCount => {
      this.setState({enrollmentCount});
    });
    getAccountCount().then(accountCount => {
      this.setState({accountCount});
    })
  }

  toggleShowEnrolledOnly = (value) => {
    // console.log(value);
    // this.setState({showEnrolledOnly: value});
    this.props.screenProps.toggleEnrollOnly();
  }

  logout = () => {
    this.props.screenProps.logout();
  }

  render() {

    const { height, width } = this.state;
    const { account } = this.props.screenProps;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize:35}}>{this.state.enrollmentCount}</Text>
              <Text>ENROLLMENTS</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize:35}}>{this.state.noteCount}</Text>
              <Text>NOTES</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize:35}}>{this.state.accountCount}</Text>
              <Text>ACCOUNTS</Text>
            </View>
          </View>
          <Divider style={{ marginVertical: 2, marginHorizontal: 60 }} />
          <View style={{flex:2, padding: 20}}>
            <Text style={{fontSize: 25}}>{`${account.firstName} ${account.lastName}`} <Text style={{fontSize: 20}}>{` - @${account.username}`}</Text></Text>
            <Text style={{fontSize: 15}}>{account.email}</Text>
          </View>
          <View style={{flex:1, padding: 20}}>
            <Text style={{fontSize: 15}}>Toggle Show Enroll Only</Text>
            <Switch style={{marginTop: -25}} value={account.showEnrolled.data[0] === 1} onValueChange={value => this.toggleShowEnrolledOnly(value)} />
          </View>
          <Divider style={{ marginVertical: 10, marginHorizontal: 60 }} />
          <Button icon={<Icon name='sign-out' size={20} color='white' />} text='LOGOUT' onPress={() => this.logout()} buttonStyle={[styles.logoutButton, { width: width / 2 }]} />
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
  logoutButton: {
    // marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#ED6A5A",
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 100
  }
});