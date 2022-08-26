import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";
import Account from "./screens/Profile/Account";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const OrderStack = createStackNavigator();

class HomeStackScreens extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <HomeStack.Navigator initialRouteName="HOME">
        <HomeStack.Screen name="HOME" component={HomeScreen} options={{ title: "Home" }} />
        <HomeStack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Product Detail" }} />
      </HomeStack.Navigator>
    )
  }
}

class CartStackScreens extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <CartStack.Navigator initialRouteName="cart"
        screenOptions={{
          unmountOnBlur: true,
        }}>
        <CartStack.Screen name="cart" component={CartScreen} options={{ title: "Cart" }}  />
        <CartStack.Screen name="checkout" component={CheckoutScreen} options={{ title: "Checkout" }} />
      </CartStack.Navigator>
    )
  }
}

class OrderStackScreens extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <OrderStack.Navigator initialRouteName="index"
        screenOptions={{
          unmountOnBlur: true,
        }}>
        <OrderStack.Screen name="index" component={OrderScreen} options={{ title: "Orders" }}  />
      </OrderStack.Navigator>
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
          <Tab.Navigator initialRouteName="home"
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 16,
              },
              headerShown: false,
              unmountOnBlur: true,
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
              name="cartstack"
              component={CartStackScreens}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  navigation.navigate('cartstack', {
                    screen: "cart",
                  })
                },
              })}
              options={{
                title: "Cart",
                tabBarIcon: () => {
                  return <Ionicons name="cart-outline" size={20} color={"red"} />;
                },
              }} />
            <Tab.Screen
              name="order"
              component={OrderStackScreens}
              options={{
                title: "Order",
                tabBarIcon: () => {
                  return <Ionicons name="receipt-outline" size={20} color={"red"} />;
                },
              }} />
            <Tab.Screen
              name="account"
              component={Account}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  navigation.navigate('account', {
                    screen: "profile",
                  })
                },
              })}
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
