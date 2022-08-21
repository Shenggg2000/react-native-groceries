import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AppToken {
  getToken = async () => {
    const userToken = await AsyncStorage.getItem('token');
    return userToken
  };

  saveToken = async userToken => {
    await AsyncStorage.setItem('token', userToken);
  };

  deleteToken = async () => {
    await AsyncStorage.removeItem('token');
  };
}