import React, { Component } from "react";
import { Alert, View, Text, FlatList, TouchableHighlight, TouchableNativeFeedback, Image } from "react-native";
import { AppButton } from "../ui/UI"
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppToken from './Helper/AppToken';

export default class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      isFetching: false,
      isLogin: false,
      token: "",
    }
    this.appToken = new AppToken();
    this._refresh = this._refresh.bind(this);
    this._load = this._load.bind(this);
    this._addQuantity = this._addQuantity.bind(this);
    this._subQuantity = this._subQuantity.bind(this);
    this._delete = this._delete.bind(this);
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
    let url = 'http://10.0.2.2:3001/carts';
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
      .then(cartItems => {
        this.setState({ cartItems })
      })
      .catch(error => {
        console.log(error);
      });
  }

  _addQuantity(product_id, quantity) {
    let url = 'http://10.0.2.2:3001/carts/edit';
    this.setState({ isFetching: true });
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id,
        quantity,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }
        this.setState({ isFetching: false });
        return response.json();
      })
      .then(() => {
        this._load();
      })
      .catch(error => {
        console.log(error);
      });
  }

  _subQuantity(product_id, quantity) {
    if (quantity == 0) {
      this._delete();
      this._load();
      return;
    }
    let url = 'http://10.0.2.2:3001/carts/edit';
    this.setState({ isFetching: true });
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id,
        quantity,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }
        this.setState({ isFetching: false });
        return response.json();
      })
      .then(() => {
        this._load();
      })
      .catch(error => {
        console.log(error);
      });
  }

  _delete(product_id) {
    Alert.alert('Confirm to remove item from cart', "", [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          let url = 'http://10.0.2.2:3001/carts/delete';
          this.setState({ isFetching: true });
          fetch(url, {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + this.state.token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              product_id,
            }),
          })
            .then(response => {
              if (!response.ok) {
                throw Error('Error ' + response.status);
              }
              this.setState({ isFetching: false });
              return response.json();
            })
            .then(() => {
              this._load();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    ])
  }

  componentDidMount() {
    this._refresh();
  }

  calculateTotalCost() {
    let items = this.state.cartItems;
    if (items.length > 0) {
      return items.reduce((total, item) => {
        return (total + (item.quantity * item.price));
      }, 0)
    }
    return 0;
  }

  render() {
    return (
      <>
        {
          this.state.cartItems.length === 0 ?
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ fontSize: 18, textAlign: "center" }}>Empty Cart</Text>
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
                data={this.state.cartItems}
                renderItem={({ item }) => {
                  return (
                    <TouchableNativeFeedback
                    // onPress={() =>
                    //   this.props.navigation.navigate('View', {
                    //     id: item.id,
                    //     _refresh: this._load,
                    //   })
                    // }
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
                            <TouchableHighlight onPress={() => {
                              this._subQuantity(item.product_id, item.quantity - 1)
                            }}>
                              <View style={{ alignItems: "center", justifyContent: "center", width: 20, height: 20, marginLeft: 5, marginRight: 5, borderColor: "#777", borderWidth: 1, borderRadius: 5 }}>
                                <Text>-</Text>
                              </View>
                            </TouchableHighlight>
                            <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
                            <TouchableHighlight onPress={() => {
                              this._addQuantity(item.product_id, item.quantity + 1)
                            }}>
                              <View style={{ alignItems: "center", justifyContent: "center", width: 20, height: 20, marginLeft: 5, marginRight: 5, borderColor: "#777", borderWidth: 1, borderRadius: 5 }}>
                                <Text>+</Text>
                              </View>
                            </TouchableHighlight>
                          </View>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 18 }}>Subtotal: </Text>
                            <Text style={{ fontSize: 18, fontWeight: "700" }}>RM{item.quantity * item.price}</Text>
                          </View>
                        </View>
                        <View style={{ flexBasis: 20, justifyContent: "center" }}>
                          <Ionicons name="trash" size={20} color={'red'} onPress={() => {
                            this._delete(item.product_id);
                          }} />
                        </View>
                      </View>
                    </TouchableNativeFeedback>
                  );
                }}></FlatList>
              <View>
                <View style={{ padding: 20, paddingBottom: 0, flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 18 }}>Total: </Text>
                  <Text style={{ fontSize: 18, fontWeight: "700" }}>RM{this.calculateTotalCost()}</Text>
                </View>
                <View style={{ padding: 20 }}>
                  <AppButton title={'Checkout'}></AppButton>
                </View>
              </View>
            </>
        }
      </>
    )
  }
}
