import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, WebView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F6F6EF'
  },
});

export default class Web extends React.Component {
  static navigationOptions = {
    title: 'Web View',
  };

  render() {
    console.log('navigation', this.props.navigation);
    return (
      <View style={styles.container}>
        <WebView source={{
          uri: this.props.navigation.getParam('source')
        }} />
      </View>
    );
  }
}

Web.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        source: PropTypes.string.isRequired
      })
    })
  }).isRequired
};
