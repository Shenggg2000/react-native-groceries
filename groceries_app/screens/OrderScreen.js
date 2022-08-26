import React, { Component } from "react";
import { Alert, View, Text, FlatList, TouchableHighlight, TouchableNativeFeedback, Image } from "react-native";
import { AppButton } from "../ui/UI"
import AppToken from './Helper/AppToken';

Date.prototype.formatted = function() {
  let day = this.getDay();
  let date = this.getDate();
  let month = this.getMonth();
  let year = this.getFullYear();
  let daysText = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let monthsText = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  return `${daysText[day]}, ${monthsText[month]} ${date}, ${year}`;
}

export default class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: [],
      isFetching: false,
      isLogin: false,
      token: "",
    }
    this.appToken = new AppToken();
    this._refresh = this._refresh.bind(this);
    this._load = this._load.bind(this);
  }

  async _refresh() {
    let token = await this.appToken.getToken();
    console.log(token);
    if (token) {
      this.setState({ isLogin: true, token });
      this._load();
    }
  }

  _load() {
    let url = 'http://10.0.2.2:3001/orders';
    this.setState({ isFetching: true });
    fetch(url, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }
        this.setState({ isFetching: false });
        return response.json();
      })
      .then(orderItems => {
        console.log(orderItems);
        this.setState({ orderItems })
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this._refresh();
  }

  render() {
    return (
      <>
        {
          this.state.isLogin ?
            this.state.orderItems.length === 0 ?
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>No order found.</Text>
                <View style={{ padding: 20 }}>
                  <AppButton title={'Go Shopping'}
                    onPress={() =>
                      this.props.navigation.navigate('home', {
                        screen: "HOME",
                      })
                    }></AppButton>
                </View>
              </View>
              :
              <>
                <FlatList
                  refreshing={this.state.isFetching}
                  onRefresh={this._load}
                  data={this.state.orderItems}
                  renderItem={({ item }) => {
                    return (
                      <TouchableNativeFeedback
                      >
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 20 }}>
                          <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Order # {item.id}</Text>
                          </View>
                          {
                            item.products.map((p) => {
                              return (
                                <View style={{ flexDirection: "row", borderBottomColor: '#ccc', paddingBottom: 10 }}>
                                  <View style={{ flex: 2 }}>
                                    <Image
                                      style={{ width: 80, height: 80, backgroundColor: "#333", borderRadius: 10, resizeMode: 'contain' }}
                                      source={{ uri: `${p.img}` }} />
                                  </View>
                                  <View style={{ flex: 7, justifyContent: "center", marginLeft: 20 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
                                      {p.name}
                                    </Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                                      <Text style={{ fontSize: 14 }}>Quantity:</Text>
                                      <Text style={{ fontSize: 14 }}>{p.quantity}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                      <Text style={{ fontSize: 14 }}>Subtotal: </Text>
                                      <Text style={{ fontSize: 14, fontWeight: "700" }}>RM{p.quantity * p.price}</Text>
                                    </View>
                                  </View>
                                </View>
                              )
                            })
                          }
                          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                            <Text style={{ fontSize: 16, marginRight: 5, fontWeight: "700"}}>Total Amount:</Text>
                            <Text style={{ fontSize: 16 }}>{item.amount}</Text>
                          </View>
                          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                            <Text style={{ fontSize: 16, marginRight: 5, fontWeight: "700" }}>Delivery Address:</Text>
                            <Text style={{ fontSize: 16 }}>{item.delivery_address}</Text>
                          </View>
                          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                            <Text style={{ fontSize: 16, marginRight: 5, fontWeight: "700" }}>Payment Method:</Text>
                            <Text style={{ fontSize: 16 }}>{item.payment_method}</Text>
                          </View>
                          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                            <Text style={{ fontSize: 16, marginRight: 5, fontWeight: "700" }}>Order At:</Text>
                            <Text style={{ fontSize: 16 }}>{new Date(item.created_at).formatted()}</Text>
                          </View>
                        </View>
                      </TouchableNativeFeedback>
                    );
                  }}></FlatList>
              </>
            :
            <>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>You are not Login</Text>
                <View style={{ padding: 20 }}>
                  <AppButton title={'Go Login'}
                    onPress={() => {
                      console.log(123);
                      this.props.navigation.navigate('account', {
                        screen: "profile",
                      })
                    }}></AppButton>
                </View>
              </View>
            </>
        }
      </>
    )
  }
}
