import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, View, ScrollView, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import { getClassNotes } from '../../../services/NoteService';
import { List, ListItem, Body, Text } from 'native-base';
import { Icon, SearchBar, SocialIcon } from 'react-native-elements';
import moment from 'moment';

export default class Note extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      searchResults: undefined,
      refreshing: false
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
  
  addNote = () => {
    const classInfo = this.props.navigation.state.params;
    this.props.navigation.navigate('AddNote', classInfo);
  }

  search = (text) => {
    const searchResults = (text.replace(/ /g,'') !== '') && this.state.notes.filter(note => note.title.toLowerCase().includes(text.toLowerCase()) || `${note.firstName} ${note.lastName}`.toLowerCase().includes(text.toLowerCase()));
    this.setState({searchResults});
  }

  refresh = () => {
    const classInfo = this.props.navigation.state.params;
    getClassNotes(classInfo.id).then(notes => {
      console.log(notes);
      this.setState({notes});
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
        <SearchBar clearIcon
          onClearText={() => this.setState({searchResults:undefined})}
          onChangeText={(text) => this.search(text)}
          placeholder='Search for notes...' />
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refresh()} />}>
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
                </ListItem>)
              }
            </List>
          </ScrollView>
          <TouchableHighlight onPress={() => this.addNote()} style={styles.addButton}>
            <Icon name='plus' type='font-awesome' color='white' size={40}/>
          </TouchableHighlight>
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
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: '#5386E4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10
  }
});