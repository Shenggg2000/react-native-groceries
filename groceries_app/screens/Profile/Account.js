import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "./EditProfileScreen";
import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createStackNavigator();

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <>
          <Stack.Navigator initialRouteName="profile"
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 16,
              },
            }}
          >
            <Stack.Screen
              name="profile"
              component={ProfileScreen}
              options={{
                title: "Profile",
              }} />
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{
                title: "Login",
              }} />
            <Stack.Screen
              name="signup"
              component={SignUpScreen}
              options={{
                title: "Sign Up",
              }} />
            <Stack.Screen
              name="edit"
              component={EditProfileScreen}
              options={{
                title: "Edit Profile",
              }} />
          </Stack.Navigator>
      </>
    )
  }
}
