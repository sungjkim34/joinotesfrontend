import React, { Component } from 'react';
import { Dimensions, Keyboard, StyleSheet, KeyboardAvoidingView, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Label, Input, Item } from 'native-base';
import { checkUsername } from '../../services/AccountService';

export default class Register extends Component {

    constructor() {
        super();
        this.state = {
            height: undefined,
            width: undefined,
            account: {
                firstName: undefined,
                lastName: undefined,
                username: undefined,
                password: undefined,
                email: undefined
            },
            usernameExists: false
        };
    }

    componentWillMount() {
        const { width, height } = Dimensions.get('window');
        this.setState({ width, height });
    }

    register = () => {
        Keyboard.dismiss();
        this.props.screenProps.register(this.state.account);
    }

    cancel = () => {
        this.props.navigation.goBack();
    }

    isRegisteredDisabled() {

        const { firstName, lastName, username, password, email } = this.state.account;

        if(!firstName || !lastName || !username || !password || !email || this.state.usernameExists) {
            return true;
        }
        return false;
    }

    enterUsername(username) {
        this.setState({ account: {...this.state.account,  username }});
        username && checkUsername(username).then(res => {
            console.log(res);
            this.setState({usernameExists: res});
        });
    }

    render() {

        const { height, width } = this.state;

        return (
            <View style={styles.mainContainer}>
                <ImageBackground source={require('../../assets/bg-image.jpeg')} style={styles.backgroundImage}>
                    <KeyboardAvoidingView width={width - 50} height={height - 120} isVisible={true}>
                        <View style={styles.contentContainer}>
                            <View style={styles.topContainer}>
                                <Text style={[styles.logoText, { fontSize: height / 10 }]}>JoiNotes</Text>
                            </View>
                            <View style={{ marginLeft: 10, marginRight: 10 }}>
                                <View flexDirection='row' style={{marginBottom: 5}}>
                                    <Item style={{flex:1}} regular>
                                        <Input style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#acacac', opacity:0.5}} placeholder='First Name' onChangeText={(firstName) => this.setState({ account: { ...this.state.account, firstName } })} />
                                    </Item>
                                    <Item style={{flex:1}} regular>
                                        <Input style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#acacac', opacity:0.5}} placeholder='Last Name' onChangeText={(lastName) => this.setState({ account: { ...this.state.account, lastName } })} />
                                    </Item>
                                </View>
                                <Item regular style={{marginBottom: 5}}>
                                    <Input autoCapitalize='none' style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#acacac', opacity:0.5}}  placeholder='Email' keyboardType='email-address' onChangeText={(email) => this.setState({ account: { ...this.state.account, email } })} />
                                </Item>
                                <Item regular style={{marginBottom: 5}} error={this.state.usernameExists}>
                                    <Input autoCapitalize='none' style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#acacac', opacity:0.5}}  placeholder='Username' onChangeText={(username) => this.enterUsername(username)} />
                                    {this.state.usernameExists && <Icon name='exclamation-circle' size={30} color='red' />}
                                </Item>
                                <Item regular style={{marginBottom: 5}}>
                                    <Input autoCapitalize='none' style={{backgroundColor: 'white', borderWidth: 1, borderColor: '#acacac', opacity:0.5}}  placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({ account: { ...this.state.account, password } })} />
                                </Item>
                            </View>
                            <Button disabled={this.isRegisteredDisabled()} text='REGISTER' onPress={() => this.register()} buttonStyle={[styles.loginButton, {width: width / 1.5}, this.isRegisteredDisabled() && {opacity: 0.5}]} />
                            <Button text='CANCEL' onPress={() => this.cancel()} buttonStyle={[styles.registerButton, { width: width / 1.5 }]} />
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginButton: {
        marginTop: 15,
        backgroundColor: "#5386E4",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100
    },
    registerButton: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: "#ED6A5A",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100
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
    }
});