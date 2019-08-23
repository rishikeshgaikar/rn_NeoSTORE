import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Heading, Spinner } from '../components';
import style from '../Styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.checkUser();
  }

  async checkUser() {
    const { navigate } = this.props.navigation;
    try {
      const value = await AsyncStorage.getItem('@NeoSTORE_at');
      if (value !== null) {
        navigate('Home');
      } else {
        navigate('Login');
      }
    } catch (e) {
      console.log('Error retrieving data' + e);
    }
  }
  render() {
    return (
      <SafeAreaView style={style.redContainer}>
        <Heading>NeoSTORE</Heading>
        <Spinner />
      </SafeAreaView>
    );
  }
}
