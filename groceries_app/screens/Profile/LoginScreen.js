
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import AppToken from '../Helper/AppToken';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      notMatch: false,
    };
    this.appToken = new AppToken();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    let url = 'http://10.0.2.2:3001/users/login';
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
        if (data.error) {
          this.setState({ notMatch: true })
        }else{
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
        <Image style={styles.image} source={require("../../images/logo.png")} />

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Email"
            placeholderTextColor="grey"
            onChangeText={(email) => this.setState({ email: email })}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password: password })}
          />
        </View>

        <Text>{this.state.notMatch && "Unmatch email/password"}</Text>

        <TouchableOpacity style={styles.loginBtn} onPress={this.onSubmit}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 5,
  },

  inputView: {
    backgroundColor: "lightgreen",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    alignItems: "center",

  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
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
});