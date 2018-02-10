import React, {Component} from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Home extends Component {

  login = () => {
    this.props.navigation.navigate('Login');
  }

  register = () => {
    this.props.navigation.navigate('Register');
  }
  
  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground source={require('../../assets/bg-image.jpeg')} style={styles.backgroundImage}>
          <View style={styles.contentContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.logoText}>Tagker</Text>
            </View>
            <Button text='BUTTON' buttonStyle={styles.loginButtonStyle} />
            <Button
  icon={
    <Icon
      name='arrow-right'
      size={15}
      color='white'
    />
  }
  text='BUTTON WITH ICON'
/>
            {/* <TouchableHighlight onPress={()=>this.login()} style={styles.loginButton}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>this.register()} style={styles.registerButton}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableHighlight> */}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginButtonStyle: {
    backgroundColor: "rgba(92, 99,216, 1)",
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
    fontSize: 75,
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
  loginButton: {
    flex: 1,
    backgroundColor: '#00A6FB',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#FF5E5B',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  }
});