import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";
import Account from "./screens/Profile/Account";
import ProductDetailScreen from "./screens/ProductDetailScreen";


const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

class HomeStackScreens extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    return(
      <HomeStack.Navigator>
        <HomeStack.Screen name="HOME" component={HomeScreen} options={{ headerShown: false }}/>
        <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }}/>
      </HomeStack.Navigator>
    )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="cart"
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 16,
              },
            }}
          >
            <Tab.Screen
              name="home"
              component={HomeStackScreens}
              options={{
                title: "Home",
                tabBarIcon: () => {
                  return <Ionicons name="home-outline" size={20} color={"red"} />;
                },
              }} />
            <Tab.Screen
              name="cart"
              component={CartScreen}
              options={{
                title: "Cart",
                tabBarIcon: () => {
                  return <Ionicons name="cart-outline" size={20} color={"red"} />;
                },
              }} />
            <Tab.Screen
              name="order"
              component={OrderScreen}
              options={{
                title: "Order",
                tabBarIcon: () => {
                  return <Ionicons name="receipt-outline" size={20} color={"red"} />;
                },
              }} />
            <Tab.Screen
              name="account"
              component={Account}
              options={{
                headerShown: false,
                tabBarIcon: () => {
                  return <Ionicons name="person-outline" size={20} color={"red"} />;
                },
              }} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    )
  }
}
