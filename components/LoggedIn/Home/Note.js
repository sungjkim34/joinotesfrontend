import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { getClassNotes } from '../../../services/NoteService';
import { List, ListItem, Body, Text } from 'native-base';
import { Icon, SearchBar } from 'react-native-elements';
import moment from 'moment';

export default class Note extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      searchResults: undefined
    }
  }

  componentWillMount() {
    const classInfo = this.props.navigation.state.params;
    getClassNotes(classInfo.id).then(notes => {
      console.log(notes);
      this.setState({notes});
    });
  }

  showDetails(note) {
    console.log('showdetails');
    this.props.navigation.navigate('NoteDetail', note);
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
        <SearchBar clearIcon
          onClearText={() => this.setState({searchResults:undefined})}
          onChangeText={(text) => this.search(text)}
          placeholder='Search for notes...' />
          <ScrollView>
            <List>
              {!this.state.searchResults ? this.state.notes.map((note, i) => 
                <ListItem key={i}>
                  <Body>
                    <TouchableWithoutFeedback onPress={() => this.showDetails(note)} flexDirection='row' >
                      <View flexDirection='row'>
                        <Icon name='circle' type='font-awesome' size={5}/>
                        <View style={{flex:1}}>
                          <Text>{note.title}</Text>
                          <View flexDirection='row'>
                            <Text note>{`${note.firstName} ${note.lastName}`}</Text>
                            <View style={{flex:1}}/>
                            <Text note>{moment(note.date).format('MMM DD, YYYY')}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </Body>
                </ListItem>) : 
                this.state.searchResults.map((note, i) => 
                <ListItem key={i}>
                  <Body>
                    <View flexDirection='row'>
                      <Icon name='circle' type='font-awesome' size={5}/>
                      <View style={{flex:1}}>
                        <Text>{note.title}</Text>
                        <Text note>{`${note.firstName} ${note.lastName}`}</Text>
                      </View>
                    </View>
                  </Body>
                </ListItem>)
              }
            </List>
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