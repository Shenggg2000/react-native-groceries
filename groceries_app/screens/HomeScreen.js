import React, { Component } from "react";
import { View, Text, ScrollView, Image, FlatList, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color, Fonts } from '../ui/theme';
import { ProductItem } from '../ui/UI';
import AppToken from './Helper/AppToken';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isFetching: false,
      isLogin: false,
      token: "",
    }
    this.appToken = new AppToken();
    this._load = this._load.bind(this);
    this._addToCart = this._addToCart.bind(this);
  }

  async _refresh() {
    let token = await this.appToken.getToken();
    if (token) {
      this.setState({ isLogin: true, token });
    }
  }

  _load() {
    let url = 'http://10.0.2.2:3001/products';
    this.setState({ isFetchingProduct: true });
    fetch(url, { method: 'get' })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({ isFetching: false });
        return response.json();
      })
      .then(products => {
        this.setState({ products: products.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  _addToCart(product_id, product_name) {
    let url = 'http://10.0.2.2:3001/carts/add';
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id,
        quantity: 1
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(() => {
        // this._load();
        Alert.alert(
          product_name,
          "Add to cart successfully"
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this._refresh();
    this._load();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <View style={{ marginLeft: 20, marginTop: 20, alignItems: "center" }}>
            <Text style={styles.title}>All Products</Text>
          </View>
          <View>
            <FlatList
              style={{ marginLeft: 10 }}
              key={'flatlist'}
              refreshing={this.state.isFetching}
              onRefresh={this._load}
              data={this.state.products}
              renderItem={({ item }) => {
                return (
                  <ProductItem
                    item={item}
                    _addToCart={this._addToCart}
                    onPress={() => {
                      this.props.navigation.navigate('ProductDetail', {
                        params: { item: item },
                        _addToCart: this._addToCart
                      });
                    }}
                  />
                )
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
    paddingBottom: 20
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
  },
  categoryMainContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 20,
    flexDirection: 'column',
  },
  categoryHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  categoryContainer: {
    height: 75,
    width: 75,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  categoryDetailsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  title: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    fontSize: 14,
    marginLeft: 10,
  },
  subtitle: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.gray,
    fontSize: 12,
    marginLeft: 10,
  },
  catTitle: {
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    fontSize: 12,
    width: 80,
    height: 35,
    textAlign: 'center',
    marginLeft: 10,
  },
  itemContainer: {
    marginTop: 10,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
