import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { getNoteDetail } from '../../../services/NoteService';
import { List, ListItem, Body, Text } from 'native-base';
import { Icon, SearchBar } from 'react-native-elements';
import moment from 'moment';

export default class NoteDetail extends Component {
  constructor() {
    super();
    this.state = {
      note: undefined,
      searchResults: undefined
    }
  }

  componentWillMount() {
    const note = this.props.navigation.state.params;
    getNoteDetail(note.id).then(note => {
      console.log(note);
      this.setState({note});
    });
  }

  showDetails() {
    console.log('showdetails');
    // this.props.navigation.navigate('NoteDetail', classInfo);
  }
  
  addNote = (classInfo) => {
    console.log(classInfo);
  }

  search = (text) => {
    const searchResults = (text.replace(/ /g,'') !== '') && this.state.notes.filter(note => note.title.toLowerCase().includes(text.toLowerCase()) || `${note.firstName} ${note.lastName}`.toLowerCase().includes(text.toLowerCase()));
    this.setState({searchResults});
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <ScrollView>
            
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
    backgroundColor: 'rgba(0,0,0,0)'
  }
});