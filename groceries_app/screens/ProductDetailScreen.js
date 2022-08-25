import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Color, Fonts} from '../ui/theme';

export default class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productItem: null,
      itemIndex: -1,
    };
  }

  render() {
    const {navigation} = this.props;
    const {productItem} = this.state;
    return (
      <View style={styles.mainContainer}>
        {productItem !== undefined && productItem !== null ? (
          <ScrollView style={styles.scrollView}>
            <View style={styles.imageContainer}>
              <View>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: `${productItem.img}`,
                  }}
                />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.option}>
                {'RM' + productItem.price}
              </Text>
              <Text style={styles.title}>{productItem.name}</Text>
              <Text style={styles.description}>{productItem.desc}</Text>
              <View style={styles.addToCart}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.props.onPress}>
                    <Text style={styles.addToCartText}>Add To Cart</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
  },
  imageContainer: {
    display: 'flex',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  productImage: {
    height: 200,
    width: 200,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 16,
    color: Color.gray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    marginTop: 20,
  },
  description: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.gray,
    textAlign: 'center',
    marginTop: 20,
  },
  option: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    color: Color.colorPrimary,
  },
  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    color: Color.white,
  },
  addToCart: {
    backgroundColor: Color.colorPrimary,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
    width: 100,
    marginTop: 20,
  },
});