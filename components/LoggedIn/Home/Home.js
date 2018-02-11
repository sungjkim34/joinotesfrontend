import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { getAccountEnrollmentDetailed, getAllClassesDetailed, enrollClass, dropClass } from '../../../services/ClassService';
import { List, ListItem, Body, Text } from 'native-base';
import { Icon, SearchBar } from 'react-native-elements';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      classList: [],
      enrolledClasses: [],
      searchResults: undefined,
      refreshing: false
    }
  }

  componentWillMount() {
    const { account } = this.props.screenProps;
    
    account.showEnrolled.data[0] === 0 && getAllClassesDetailed().then(classList => {
      this.setState({ classList });
    });
    getAccountEnrollmentDetailed(account.id).then(enrolledClasses => {
      account.showEnrolled.data[0] !== 0 ? this.setState({ classList: enrolledClasses, enrolledClasses }) : this.setState({ enrolledClasses });
    });
  }

  enrollClass = (classInfo) => {
    const { account } = this.props.screenProps;

    enrollClass(account.id, classInfo.id).then(res => {
      this.setState({enrolledClasses: [...this.state.enrolledClasses, {...classInfo, enrollmentId: res.insertId}]})
    });
  }

  dropClass = (classId) => {
    const dropClassInfo = this.state.enrolledClasses.filter(enrolledClass => enrolledClass.id === classId)[0];
    
    dropClass(dropClassInfo.enrollmentId).then(res => {
      this.setState({enrolledClasses: this.state.enrolledClasses.filter(enrolledClass => enrolledClass.enrollmentId !== dropClassInfo.enrollmentId)});
    });
  }

  checkIfEnrolled(classId) {
    const enrolled = this.state.enrolledClasses.filter(classInfo => classInfo.id === classId).length;
    return !!enrolled;
  }
  
  viewNotes = (classInfo) => {
    this.props.navigation.navigate('Note', classInfo);
  }

  search = (text) => {
    const searchResults = (text.replace(/ /g,'') !== '') && this.state.classList.filter(classInfo => `${classInfo.courseName}${classInfo.courseId} - ${classInfo.name}`.toLowerCase().includes(text.toLowerCase()) || `${classInfo.firstName} ${classInfo.lastName}`.toLowerCase().includes(text.toLowerCase()));
    this.setState({searchResults});
  }

  refresh = () => {
    const { account } = this.props.screenProps;

    this.setState({refreshing: true});
    account.showEnrolled.data[0] === 0 && getAllClassesDetailed().then(classList => {
      this.setState({ classList });
      this.setState({refreshing: false});
    });
    getAccountEnrollmentDetailed(account.id).then(enrolledClasses => {
      account.showEnrolled.data[0] !== 0 ? this.setState({ classList: enrolledClasses, enrolledClasses }) : this.setState({ enrolledClasses });
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
        <SearchBar clearIcon round
          onClearText={() => this.setState({searchResults:undefined})}
          onChangeText={(text) => this.search(text)}
          placeholder='Search for classes...' />
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refresh()} />}>
            <List>
              {!this.state.searchResults ?
                this.state.classList.map((classInfo, i) => 
                  <ListItem key={i}>
                    <Body>
                      <View flexDirection='row'>
                        {this.checkIfEnrolled(classInfo.id) ?
                          <Icon name='check' type='font-awesome' color='#61D893' onPress={() => this.dropClass(classInfo.id)}/> :
                          <Icon name='plus' type='font-awesome' color='#5386E4' onPress={() => this.enrollClass(classInfo)}/>
                        }
                        <View style={{flex:1}}>
                          <Text onPress={() => this.viewNotes(classInfo)}>{`${classInfo.courseName}${classInfo.courseId} - ${classInfo.name}`}</Text>
                          <Text note onPress={() => this.viewNotes(classInfo)}>{`${classInfo.firstName} ${classInfo.lastName}`}</Text>
                        </View>
                        <Icon name='chevron-right' type='font-awesome' size={15} color='#5386E4' onPress={() => this.viewNotes(classInfo)}/>
                      </View>
                    </Body>
                  </ListItem>) : 
                  this.state.searchResults.map((classInfo, i) => 
                  <ListItem key={i}>
                    <Body>
                      <View flexDirection='row'>
                        {this.checkIfEnrolled(classInfo.id) ?
                          <Icon name='check' type='font-awesome' color='#61D893' onPress={() => this.dropClass(classInfo.id)}/> :
                          <Icon name='plus' type='font-awesome' color='#5386E4' onPress={() => this.enrollClass(classInfo)}/>
                        }
                        <View style={{flex:1}}>
                          <Text>{`${classInfo.courseName}${classInfo.courseId} - ${classInfo.name}`}</Text>
                          <Text note>{`${classInfo.firstName} ${classInfo.lastName}`}</Text>
                        </View>
                        <Icon name='chevron-right' type='font-awesome' size={15} color='#5386E4' onPress={() => this.viewNotes(classInfo.id)}/>
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