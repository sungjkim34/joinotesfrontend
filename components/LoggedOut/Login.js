import React, {Component} from 'react';
import { Dimensions, StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Label, Input, Item } from 'native-base';


export default class Login extends Component {
  
  constructor() {
    super();
    this.state = {
      height: undefined,
      width: undefined,
      account: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: ''
      }
    };
  }

  componentWillMount() {
    const {width, height} = Dimensions.get('window');
    this.setState({width, height});
  }

  login = () => {
    const { firstName, lastName, email, username, password } = this.state;
    console.log(this.state.account);
      // this.props.screenProps.login(username, password);
  }

  cancel = () => {
    // this.props.screenProps.clearError();
    this.props.navigation.goBack();
  }
  
  render() {

    const { height, width } = this.state;

    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={require('../../assets/bg-image.jpeg')} style={styles.backgroundImage}>
          <Overlay width={width-50} height={height-120} isVisible={true}>
          <View style={styles.contentContainer}>
            <View style={styles.topContainer}>
              <Text style={[styles.logoText, {fontSize: height/15}]}>JoiNotes</Text>
            </View>
            <View style={{marginLeft: 10, marginRight: 10}}>
              <Item floatingLabel>
                <Label>First Name</Label>
                <Input onChangeText={(firstName) => this.setState({account: {...this.state.account, firstName}})} />
              </Item>
              <Item floatingLabel>
                <Label>Last name</Label>
                <Input onChangeText={(lastName) => this.setState({account: {...this.state.account, lastName}})} />
              </Item>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={(username) => this.setState({account: {...this.state.account, username}})} />
              </Item>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({account: {...this.state.account, email}})} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry={true} onChangeText={(password) => this.setState({account: {...this.state.account, password}})} />
              </Item>
            </View>
            <Button text='LOGIN' onPress={() => this.login()} buttonStyle={styles.loginButton} />
            <Button text='CANCEL' onPress={() => this.cancel()} buttonStyle={styles.registerButton} />
          </View>
          </Overlay>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 15,
    backgroundColor: "#5386E4",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  registerButton: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#ED6A5A",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#4c4c4c'
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  topContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  // loginButton: {
  //   flex: 1,
  //   backgroundColor: '#00A6FB',
  //   alignSelf: 'stretch',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  // registerButton: {
  //   flex: 1,
  //   backgroundColor: '#FF5E5B',
  //   alignSelf: 'stretch',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // }
});