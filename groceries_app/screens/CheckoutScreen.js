import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback, Image, FlatList, StyleSheet, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppButton } from "../ui/UI"
import { Picker } from '@react-native-picker/picker';
import AppToken from './Helper/AppToken';

export default class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      productTotal: 0,
      cartItems: [],
      paymethod: "PayPal",
      delivery_address: "",
      isLogin: false,
      token: "",
    }
    this.appToken = new AppToken();
    this._addOrder = this._addOrder.bind(this);
    this._refresh = this._refresh.bind(this);
  }

  componentDidMount() {
    this.setState({ productTotal: this.props.route.params.total })
    this.setState({ cartItems: this.props.route.params.items })
    this._refresh();
  }

  _addOrder() {
    let url = 'http://10.0.2.2:3001/orders/add';
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: this.state.productTotal + 10,
        delivery_address: this.state.delivery_address,
        payment_method: this.state.paymethod,
        products: this.state.cartItems
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(() => {
        this.props.navigation.navigate('home')
      })
      .catch(error => {
        console.log(error);
      });
  }

  async _refresh() {
    let token = await this.appToken.getToken();
    console.log(token);
    if (token) {
      this.setState({ isLogin: true, token });
      this._load();
    }
  }

  render() {
    return (
      <ScrollView>
        <View
        >
          <FlatList
            refreshing={this.state.isFetching}
            data={this.state.cartItems}
            renderItem={({ item }) => {
              return (
                <TouchableNativeFeedback
                >
                  <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 20 }}>
                    <View style={{ flex: 3 }}>
                      <Image
                        style={{ width: 100, height: 100, backgroundColor: "#333", borderRadius: 10, resizeMode: 'contain' }}
                        source={{ uri: `${item.img}` }} />
                    </View>
                    <View style={{ flex: 7, justifyContent: "center", marginLeft: 20 }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>
                        {item.name}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                        <Text style={{ fontSize: 18 }}>Quantity:</Text>
                        <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontSize: 18 }}>Subtotal: </Text>
                        <Text style={{ fontSize: 18, fontWeight: "700" }}>RM{item.quantity * item.price}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              );
            }}></FlatList>
        </View>
        <View style={{ marginBottom: 0 }}>
          <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 20, fontWeight: "bold", color: "#333" }}>Checkout Summary </Text>
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Delivery Address: </Text>
            <Picker
              style={{ borderColor: "#333", borderWidth: 1, padding: 10, borderRadius: 40 }}
              mode={'dropdown'}                     // 'dialog' is default, try 'dropdown'
              selectedValue={this.state.paymethod}
              onValueChange={
                (itemValue, itemIndex) => this.setState({ paymethod: itemValue })
              }>
              <Picker.Item label="PayPal" value="PayPal" />
              <Picker.Item label="Cash On Delivery" value="Cash On Delivery" />
            </Picker>
          </View>
          <View style={{ padding: 20, paddingBottom: 0 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Delivery Address: </Text>
            <TextInput
              style={{ borderColor: "#333", borderWidth: 1, padding: 10, borderRadius: 40 }}
              placeholder="Address"
              placeholderTextColor="grey"
              onChangeText={(delivery_address) => this.setState({ delivery_address })}
            />
          </View>
          <View style={{ padding: 20, paddingBottom: 0, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 18 }}>Product Total: </Text>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>RM{this.state.productTotal}</Text>
          </View>
          <View style={{ padding: 20, paddingBottom: 0, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 18 }}>Delivery Fee: </Text>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>RM10</Text>
          </View>
          <View style={{ padding: 20, paddingBottom: 0, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 18 }}>Total: </Text>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>RM{this.state.productTotal + 10}</Text>
          </View>
          <View style={{ padding: 20 }} >
            <AppButton title={'Place Order'} onPress={() => {
              this._addOrder();
            }}></AppButton>
          </View>
        </View>

      </ScrollView>
    )
  }
}
