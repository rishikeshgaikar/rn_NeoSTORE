import React, { Component } from 'react';
import { View, Text, Button, TextInput, SafeAreaView } from 'react-native';
import { RedButton } from '../components';
import R from '../R';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../api';

export default class AddressSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: '',
      address: '',
      city: '',
      pincode: '',
      state: '',
      dataSource: []
    };
  }
  orderNow() {
    const fulladdress =
      ' ' +
      this.state.address +
      ' ' +
      this.state.city +
      ' ' +
      this.state.pincode +
      ' ' +
      this.state.state;
    const url = 'order';
    const method = 'POST';
    const body = `address=${fulladdress}`;
    return api(url, method, body)
      .then(responseJson => {
        this.setState({ dataSource: responseJson }, function() {}),
          this.isSuccessfull();
      })
      .catch(error => {
        console.error(error);
      });
  }
  isSuccessfull() {
    const { navigate } = this.props.navigation;
    if (this.state.dataSource.status == 200) {
      setTimeout(function() {
        navigate('Home');
      }, 2000);
      alert('' + this.state.dataSource.user_msg);
    } else if (this.state.dataSource.status == 401) {
      alert('' + this.state.dataSource.user_msg);
    } else if (this.state.dataSource.status == 400) {
      alert('' + this.state.dataSource.user_msg);
    } else {
      alert('Something Went Wrong');
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 10 }}>
          <Text
            style={{
              marginHorizontal: 20,
              fontFamily: R.fonts.GothamBook,
              fontSize: 20,
              marginTop: 20
            }}
          >
            Enter Delivery address
          </Text>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              borderRadius: 4,
              borderWidth: 2,
              borderColor: R.colors.b9
            }}
          >
            <TextInput
              placeholder='Enter  Address'
              onChangeText={address => this.setState({ address })}
              style={{ padding: 10 }}
            />
          </View>
          <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
            <View
              style={{
                flex: 1,
                marginTop: 10,
                flexDirection: 'row',
                borderRadius: 4,
                borderWidth: 2,
                borderColor: R.colors.b9
              }}
            >
              <TextInput
                placeholder='Enter City'
                onChangeText={city => this.setState({ city })}
                style={{ padding: 10 }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 10,
                marginLeft: 10,
                flexDirection: 'row',
                borderRadius: 4,
                borderWidth: 2,
                borderColor: R.colors.b9
              }}
            >
              <TextInput
                placeholder='Enter Pincode'
                onChangeText={pincode => this.setState({ pincode })}
                style={{ padding: 10 }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              borderRadius: 4,
              borderWidth: 2,
              borderColor: R.colors.b9
            }}
          >
            <TextInput
              placeholder='Enter State'
              onChangeText={state => this.setState({ state })}
              style={{ padding: 10 }}
            />
          </View>
        </View>
        <View style={{ flex: 1, width: '100%', paddingHorizontal: 10 }}>
          <RedButton onPress={() => this.orderNow()}>PLACE ORDER</RedButton>
        </View>
      </SafeAreaView>
    );
  }
}
