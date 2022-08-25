import React, { Component } from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Color, Fonts } from '../ui/theme';

/**
 * InputWithLabel
 */
class InputWithLabel extends Component {
  constructor(props) {
    super(props);

    this.orientation = this.props.orientation
      ? this.props.orientation == 'horizontal'
        ? 'row'
        : 'column'
      : 'column';
  }

  render() {
    return (
      <View style={[inputStyles.container, { flexDirection: this.orientation }]}>
        <Text style={this.props.textLabelStyle}>{this.props.label}</Text>
        <TextInput style={[this.props.textInputStyle]} {...this.props} />
      </View>
    );
  }
}

/**
 * AppButton
 */
class AppButton extends Component {
  constructor(props) {
    super(props);

    if (props.theme) {
      switch (props.theme) {
        case 'success':
          this.backgroundColor = '#449d44';
          break;
        case 'info':
          this.backgroundColor = '#31b0d5';
          break;
        case 'warning':
          this.backgroundColor = '#ec971f';
          break;
        case 'danger':
          this.backgroundColor = '#c9302c';
          break;
        case 'primary':
        default:
          this.backgroundColor = '#286090';
      }
    } else {
      this.backgroundColor = '#286090';
    }
  }

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        background={
          Platform.OS === 'android'
            ? TouchableNativeFeedback.SelectableBackgroundBorderless(210)
            : ''
        }>
        <View
          style={[
            buttonStyles.button,
            { backgroundColor: this.backgroundColor },
          ]}>
          <Text style={buttonStyles.buttonText}>{this.props.title}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const buttonStyles = StyleSheet.create({
  button: {
    margin: 5,
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    padding: 12,
    fontSize: 18,
    color: 'white',
  },
});

/**
 * PickerWithLabel
 */

class PickerWithLabel extends Component {
  constructor(props) {
    super(props);

    this.orientation = this.props.orientation
      ? this.props.orientation == 'horizontal'
        ? 'row'
        : 'column'
      : 'column';
  }

  render() {
    return (
      <View style={[inputStyles.container, { flexDirection: this.orientation }]}>
        <Text style={this.props.textLabelStyle}>{this.props.label}</Text>
        <Picker {...this.props}>
          {this.props.items.map((item, index) => {
            return (
              <Picker.Item
                label={item.value}
                value={item.key}
                key={item.key}
                style={this.props.pickerItemStyle}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}

const inputStyles = StyleSheet.create({
  container: {
    height: 100,
  },
});

/**
 * ProductItem
 */
class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
    };
  }

  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={styles.innerContainer}>
            <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
              <Image
                style={styles.productImage}
                source={{
                  uri: `${item.img}`,
                }}
              />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.option}>
                {'RM' + item.price}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addToCart}>
            <TouchableOpacity
              activeOpacity={1} onPress={() => {
                this.props._addToCart(item.id, item.name)
              }}>
              <Text style={styles.addToCartText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: 220,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  box1: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.black,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 35,
  },
  option: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.red,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  productImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover'
  },
  addToCart: {
    backgroundColor: Color.colorPrimary,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
  },
  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    color: Color.white,
  },
});

/**
 * Export modules
 */
module.exports = {
  InputWithLabel: InputWithLabel,
  AppButton: AppButton,
  PickerWithLabel: PickerWithLabel,
  ProductItem: ProductItem,
};