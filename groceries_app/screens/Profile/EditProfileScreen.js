import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppToken from '../Helper/AppToken';

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: this.props.route.params.token,
      name: this.props.route.params.user.name,
      phone: this.props.route.params.user.phone,
      errorUpdate: false,
    }

    this.appToken = new AppToken();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log(123414);
    let url = 'http://10.0.2.2:3001/users/update';
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        phone: this.state.phone,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(async data => {
        console.log(data);
        if (data.error) {
          this.setState({ errorUpdate: true })
        } else {
          this.props.route.params.refresh();
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold' }}>
            User
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="black" size={20} />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="black" size={20} />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
            value={this.state.phone}
            onChangeText={(phone) => this.setState({ phone })}
          />
        </View>
        <Text>{this.state.notMatch && "Update Error"}</Text>

        <TouchableOpacity style={styles.commandButton} onPress={this.onSubmit}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    marginTop: 10,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: 'black',
  },
});