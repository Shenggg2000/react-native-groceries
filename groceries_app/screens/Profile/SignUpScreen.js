import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet, Text, TouchableOpacity
} from 'react-native'
import AppToken from '../Helper/AppToken';

export default class SignUpScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '', password: '', email: '', phone: '', emailUsed: false
    }

    this.appToken = new AppToken();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  onSubmit() {
    let url = 'http://10.0.2.2:3001/users/register';
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
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
          this.setState({ emailUsed: true })
        } else {
          await this.appToken.saveToken(data.token);
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
        <View>
          <Text style={styles.welcomeText}>
            Create Account
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Enter Your Name'
          autoCapitalize="none"
          placeholderTextColor='grey'
          onChangeText={val => this.onChangeText('name', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='grey'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='grey'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='grey'
          onChangeText={val => this.onChangeText('phone', val)}
        />

        <Text>{this.state.notMatch && "Email used"}</Text>

        <TouchableOpacity style={styles.loginBtn} onPress={this.onSubmit}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: 'lightgreen',
    margin: 15,
    padding: 15,
    color: 'black',
    borderRadius: 25,
    fontSize: 15,


  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 45,
    color: 'black',
    marginBottom: 40,
    fontWeight: "bold",

  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "green",
  },



  loginText: {
    fontWeight: "bold",
    color: 'white',
    fontSize: 20,
  }


})