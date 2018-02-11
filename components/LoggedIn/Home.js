import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { getAccountEnrollmentDetailed, getAllClassesDetailed, enrollClass, dropClass } from '../../services/ClassService';
import { List, ListItem, Body, Text } from 'native-base';
import { Icon, SearchBar } from 'react-native-elements';
// import { List, ListItem } from 'react-native-elements'; 

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      classList: [],
      enrolledClasses: [],
      searchResults: ''
    }
  }

  componentWillMount() {
    const { account } = this.props.screenProps;
    getAllClassesDetailed().then(classList => {
      console.log('-----Classes----');
      console.log(classList);
      this.setState({ classList });
    });
    getAccountEnrollmentDetailed(account.id).then(enrolledClasses => {
      // console.log('-----Enrolled----');
      // console.log(enrolledClasses);
      this.setState({ enrolledClasses });
    });
  }

  enrollClass = (classInfo) => {
    const { account } = this.props.screenProps;

    enrollClass(account.id, classInfo.id).then(res => {
      console.log(res);
      this.setState({enrolledClasses: [...this.state.enrolledClasses, {...classInfo, enrollmentId: res.insertId}]})
    });
  }

  dropClass = (classId) => {
    const dropClassInfo = this.state.enrolledClasses.filter(enrolledClass => enrolledClass.id === classId)[0];
    
    dropClass(dropClassInfo.enrollmentId).then(res => {
      console.log(res);
      this.setState({enrolledClasses: this.state.enrolledClasses.filter(enrolledClass => enrolledClass.enrollmentId !== dropClassInfo.enrollmentId)});
    });
  }

  checkIfEnrolled(classId) {
    const enrolled = this.state.enrolledClasses.filter(classInfo => classInfo.id === classId).length;
    return !!enrolled;
  }
  
  addNote = (classInfo) => {
    console.log(classInfo);
  }

  search = (text) => {
    const searchResults = (text.replace(/ /g,'') !== '') && this.state.classList.filter(classInfo => classInfo.name.toLowerCase().includes(text.toLowerCase()) || `${classInfo.courseId}`.toLowerCase().includes(text.toLowerCase()) || classInfo.courseName.toLowerCase().includes(text.toLowerCase()));
    this.setState({searchResults});
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
        <SearchBar
          onChangeText={(text) => this.search(text)}
          placeholder='Search for classes...' />
          <List>
            {!this.state.searchResults ? this.state.classList.map((classInfo, i) => 
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
                    <Icon name='chevron-right' type='font-awesome' size={15} color='#5386E4' onPress={() => this.addNote(classInfo.id)}/>
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
                    <Icon name='chevron-right' type='font-awesome' size={15} color='#5386E4' onPress={() => this.addNote(classInfo.id)}/>
                  </View>
                </Body>
              </ListItem>)
            }
          </List>
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