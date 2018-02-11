import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TextInput } from 'react-native';
import { addNote } from '../../../services/NoteService';
import { Icon, SearchBar, Text, Button } from 'react-native-elements';
import moment from 'moment';

export default class AddNote extends Component {
    constructor() {
        super();
        this.state = {
            height: undefined,
            width: undefined,
            note: {
                title: undefined,
                detail: undefined,
                accountId: undefined,
                classId: undefined
            }
        }
    }

    componentWillMount() {
        const {width, height} = Dimensions.get('window');
        this.setState({width, height});
    }
    
    componentDidMount() {
        const accountId = this.props.screenProps.account.id;
        const classInfo = this.props.navigation.state.params;
        this.setState({note: {...this.state.note, accountId, classId: classInfo.id}});
    }

    addNote = () => {

        const { note } = this.state;
        const classInfo = this.props.navigation.state.params;

        addNote(note).then(res => {
            // console.log(res);
            // this.props.navigation.navigate('Note', {id: classInfo.id});
            this.props.navigation.goBack();
        });
    }

    isAddDisabled() {

        const { detail, title } = this.state.note;

        if(!detail || !title) {
            return true;
        }
        return false;
    }

    render() {

        const { height, width } = this.state;

        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <View style={{alignItems: 'center'}}>
                        <Text h4>Add Note</Text>
                    </View>
                    <Text>Title:</Text>
                    <View style={{borderWidth: 1, borderRadius: 2, borderColor: '#bfc0c0', marginBottom: 15}}>
                        <TextInput onChangeText={(text) => this.setState({note: {...this.state.note, title: text}})} placeholder='Enter note title'/>
                    </View>
                    <Text>Note:</Text>
                    <ScrollView>
                        <View style={{borderWidth: 1, borderRadius: 2, borderColor: '#bfc0c0', height: 150}}>
                            <TextInput onChangeText={(text) => this.setState({note: {...this.state.note, detail: text}})} multiline={true} placeholder='Enter your note here'/>
                        </View>
                    </ScrollView>
                    <Button disabled={this.isAddDisabled()} text='ADD' onPress={() => this.addNote()} buttonStyle={[styles.addButton, { width: width / 1.5 }, this.isAddDisabled() && {opacity: 0.35}]} />
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
        backgroundColor: 'rgba(0,0,0,0)',
        margin: 25
    },
    addButton: {
        marginTop: 15,
        marginBottom: 5,
        backgroundColor: "#ED6A5A",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100
      }
});