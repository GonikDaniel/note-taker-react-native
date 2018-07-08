import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import Badge from './Badge';
import Separator from './helpers/Separator';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    fontSize: 18,
    paddingBottom: 5,
    color: '#488BEC'
  },
  stars: {
    fontSize: 14,
    paddingBottom: 5,
    color: '#488BEC'
  },
  description: {
    fontSize: 18,
    paddingBottom: 5,
  },
});

export default class Repositories extends React.Component {
  static navigationOptions = {
    title: 'Repos',
  };

  openPage(source) {
    this.props.navigation.navigate(
      'WebView',
      { source }
    );
  }

  render() {
    const userInfo = this.props.navigation.getParam('userInfo', {});
    const repos = this.props.navigation.getParam('repos', []);
    const reposList = repos.map((repo, index) => {
      const desc = repo.description
        ? <Text style={styles.description}>{repo.description}</Text>
        : <View />;

      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage.bind(this, repo.html_url)}
              underlayColor='transparent'>
              <Text style={styles.name}>{repo.name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}>Stars: {repo.stargazers_count}</Text>
            {desc}
          </View>
          <Separator />
        </View>
      );
    })

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={userInfo} />
        {reposList}
      </ScrollView>
    );
  }
}

Repositories.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        userInfo: PropTypes.object.isRequired,
        repos: PropTypes.array.isRequired,
      })
    })
  }).isRequired
};
