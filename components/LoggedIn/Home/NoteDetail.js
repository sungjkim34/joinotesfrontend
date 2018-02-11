import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { getNoteDetail } from '../../../services/NoteService';
import { Icon, Text, Divider } from 'react-native-elements';
import moment from 'moment';

export default class NoteDetail extends Component {
    constructor() {
        super();
        this.state = {
            note: undefined
        }
    }

    componentWillMount() {
        const note = this.props.navigation.state.params;
        getNoteDetail(note.id).then(note => {
            this.setState({ note });
        });
    }

    render() {

        const note = this.props.navigation.state.params;

        return (
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <ScrollView>
                        <View flexDirection='row'>
                            <Text h2 style={{color: 'black'}}>{note.title}</Text>
                            <View style={{ flex: 1 }} />
                            <Text h4 style={{textAlignVertical: 'bottom', color: 'black'}}>{moment(note.date).format('MMM DD, YYYY')}</Text>
                        </View>
                        <Text h4 style={{color: 'black'}}>{`${note.firstName} ${note.lastName}`}</Text>
                        <Divider style={{marginVertical: 20, marginHorizontal: 15}}/>
                        <Text style={{color: 'black'}}>{this.state.note && this.state.note.length && this.state.note[0].detail.replace(/ /g, '') !== '' ? this.state.note[0].detail.replace(/ {2}/g, '\n') : ''}</Text>
                    </ScrollView>
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
    }
});