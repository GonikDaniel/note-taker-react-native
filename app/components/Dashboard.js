import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { api } from '../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

export default class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { login } = navigation.getParam('userInfo', {});

    return {
      title: login || 'User card'
    };
  };

  constructor(props) {
    super(props);

    this.userInfo = this.props.navigation.getParam('userInfo', {});
  }

  makeBackground(btn) {
    const obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    };

    if (btn === 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }

    return obj;
  }

  goToProfile() {
    this.props.navigation.navigate(
      'Profile',
      { userInfo: this.userInfo }
    );
  }

  goToRepos() {
    api.getRepos(this.userInfo.login)
      .then(repos => {
        this.props.navigation.navigate(
          'Repos',
          {
            repos,
            userInfo: this.userInfo,
          }
        );
      });
  }

  goToNotes() {
    api.getNotes(this.userInfo.login)
      .then(res => {
        const notes = res || [];
        this.props.navigation.navigate(
          'Notes',
          {
            notes,
            userInfo: this.userInfo,
          }
        );
      });
  }

  render() {
    const { navigation } = this.props;
    const userInfo = navigation.getParam('userInfo', {});

    return (
      <View style={styles.container}>
        <Image source={{ uri: userInfo.avatar_url }} style={styles.image} />
        <TouchableHighlight style={this.makeBackground(0)} onPress={this.goToProfile.bind(this)}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight style={this.makeBackground(1)} onPress={this.goToRepos.bind(this)}>
          <Text style={styles.buttonText}>View Repos</Text>
        </TouchableHighlight>
        <TouchableHighlight style={this.makeBackground(2)} onPress={this.goToNotes.bind(this)}>
          <Text style={styles.buttonText}>View Notes</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
