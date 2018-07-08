import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { api } from '../utils/api';
import Badge from './Badge';
import Separator from './helpers/Separator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default class Notes extends React.Component {
  static navigationOptions = {
    title: 'Notes'
  };

  constructor(props) {
    super(props);

    this.userInfo = this.props.navigation.getParam('userInfo', {});
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.navigation.getParam('notes', [])),
      note: '',
      error: ''
    };
  }

  handleInputChange(e) {
    this.setState({
      note: e.nativeEvent.text
    });
  }

  handleSubmit() {
    const {note} = this.state;
    const {login} = this.userInfo;
    this.setState({
      note: ''
    });

    api.addNote(login, note)
      .then(data => api.getNotes(login))
      .then(data => {
        this.setState({
          dataSource: this.ds.cloneWithRows(data)
        })
      })
      .catch(error => {
        this.setState({error});
      })
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text>{rowData}</Text>
        </View>
        <Separator />
      </View>
    );
  }

  footer() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleInputChange.bind(this)}
          placeholder="New Note"
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88D4F5">
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={() => <Badge userInfo={this.userInfo} />}
          enableEmptySections={true}
        />
        {this.footer()}
      </View>
    );
  }
}

Notes.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        userInfo: PropTypes.object.isRequired,
        notes: PropTypes.array.isRequired,
      })
    })
  }).isRequired
};
