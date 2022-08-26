import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppToken from '../Helper/AppToken';
import { AppButton } from "../../ui/UI"

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      isLogin: false,
      user: {
        name: "",
        email: "",
        phone: "",
      },
    }
    this.appToken = new AppToken();
    this._logout = this._logout.bind(this);
    this._refresh = this._refresh.bind(this);
    this._getUser = this._getUser.bind(this);
  }

  _logout() {
    this.appToken.deleteToken();
    this.setState({ isLogin: false, token: "" });
  }

  async _refresh() {
    let token = await this.appToken.getToken();
    console.log(token);
    if (token) {
      this.setState({ isLogin: true, token });
      this._getUser();
    }
  }

  _getUser() {
    let url = 'http://10.0.2.2:3001/users';
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
        return response.json();
      })
      .then(user => {
        console.log(user);
        this.setState({ user })
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
      <SafeAreaView style={styles.container}>
        {this.state.isLogin ?
          <>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC',
                  }}
                  size={80}
                />
                <View style={{ marginLeft: 20 }}>
                  <Title style={[styles.title, {
                    marginTop: 15,
                    marginBottom: 5,
                  }]}>{this.state.user.name}</Title>
                </View>
              </View>
            </View>
            <View style={styles.menuWrapper}>
              <TouchableRipple onPress={() => { this.props.navigation.navigate('account', { screen: 'edit', params: { refresh: this._refresh, user: this.state.user, token: this.state.token } }); }}>
                <View style={styles.menuItem}>
                  <IconFeather name="edit" color="#18A558" size={25} />
                  <Text style={styles.menuItemText}>Edit Profile</Text>
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => { this._logout() }}>
                <View style={styles.menuItem} >
                  <IconMaterialCommunityIcons name="logout" color="#18A558" size={25} />
                  <Text style={styles.menuItemText}>Log Out</Text>
                </View>
              </TouchableRipple>
            </View>
          </>
          :
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>You Are No Login Yet.</Text>
            <View style={{ padding: 20, paddingBottom: 0 }}>
              <AppButton title={"Login"} onPress={() => { this.props.navigation.navigate('account', { screen: 'login', params: { refresh: this._refresh } }) }}></AppButton>
            </View>
            <View style={{ padding: 20, paddingBottom: 0 }}>
              <AppButton title={"SignUp"} onPress={() => { this.props.navigation.navigate('account', { screen: 'signup', params: { refresh: this._refresh } }) }}></AppButton>
            </View>
          </View>
        }

      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
})