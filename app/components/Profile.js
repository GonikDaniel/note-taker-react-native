import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Badge from './Badge';
import Separator from './helpers/Separator';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    fontSize: 16,
    color: '#488BEC'
  },
  rowContent: {
    fontSize: 19
  }
});

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile Page',
  };

  getRowTitle(field) {
    return field.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  }

  render() {
    const userInfo = this.props.navigation.getParam('userInfo', {});
    const profileFields = [
      'company',
      'location',
      'followers',
      'following',
      'email',
      'bio',
      'public_repos'
    ];
    const userFields = profileFields.map((field, index) => {
      if (!userInfo[field]) return <View key={index} />

      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}>{this.getRowTitle(field)}</Text>
            <Text style={styles.rowContent}>{userInfo[field]}</Text>
          </View>
          <Separator />
        </View>
      );
    })

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        {userFields}
      </ScrollView>
    );
  }
}
