import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
  Button
} from 'react-native';
import { RoundButton, Spinner, Heading, Input } from '../components';
import style from '../Styles';
import R from '../R';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../api';
import CartContext from '../context/CartContext';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      username: '',
      password: '',
      isLoading: false
    };
  }

  Login(cc) {
    const username = this.state.username;
    const password = this.state.password;
    const method = 'POST';
    const body = `email=${username}&password=${password}`;
    const url = 'users/login';
    return api(url, method, body)
      .then(responseJson => {
        this.setState({ dataSource: responseJson }, function() {}),
          this.isSuccessfull(cc);
      })
      .catch(error => {
        console.error(error);
      });
  }

  isSuccessfull(cc) {
    const { navigate } = this.props.navigation;
    if (this.state.dataSource.status == 200) {
      this.setState({
        isLoading: !this.state.isLoading
      }),
        this.saveKey(
          '' + this.state.dataSource.data.first_name,
          '' + this.state.dataSource.data.last_name,
          '' + this.state.dataSource.data.email,
          '' + this.state.dataSource.data.access_token
        ),
        cc.getUpdate();
      setTimeout(function() {
        navigate('Home');
      }, 2000);
    } else if (this.state.dataSource.status == 401) {
      alert('' + this.state.dataSource.user_msg);
    } else if (this.state.dataSource.status == 400) {
      alert('' + this.state.dataSource.user_msg);
    } else {
      alert('Something Went Wrong');
    }
  }
  showSpinner() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
  }

  async saveKey(value1, value2, value3, value4) {
    const fname = ['@NeoSTORE_fname', value1];
    const lname = ['@NeoSTORE_lname', value2];
    const email = ['@NeoSTORE_email', value3];
    const access_token = ['@NeoSTORE_at', value4];
    try {
      await AsyncStorage.multiSet([fname, lname, email, access_token]);
    } catch (e) {
      console.log('Error retrieving data' + error);
    }

    console.log('Done.');
  }

  render() {
    return (
      <View style={style.redContainer}>
        <StatusBar backgroundColor={R.colors.r2} />
        <View style={{ flex: 10, justifyContent: 'center' }}>
          <Heading>NeoSTORE</Heading>
          <Input
            image={R.images.username_icon}
            placeholder='Username'
            placeholderColor={R.colors.b1}
            onChangeText={username => this.setState({ username })}
            keyboardType='email-address'
          />
          <Input
            image={R.images.password_icon}
            placeholder='Password'
            placeholderColor={R.colors.b1}
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
          />
          <CartContext.Consumer>
            {contextValue => (
              <RoundButton
                disabled={this.state.isLoading}
                onPress={() => this.Login(contextValue)}
              >
                LOGIN
              </RoundButton>
            )}
          </CartContext.Consumer>

          <TouchableHighlight
            underlayColor='transparent'
            style={{ alignItems: 'center' }}
            disabled={this.state.isLoading}
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
          >
            <Text style={style.whiteText}>FORGOT PASSWORD?</Text>
          </TouchableHighlight>
          {this.showSpinner()}
        </View>
        <View style={{ flex: 1 }}>
          <TouchableHighlight
            disabled={this.state.isLoading}
            underlayColor='transparent'
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 20
              }}
            >
              <View style={{ flex: 8 }}>
                <Text style={style.whiteText}>DO YOU HAVE AN ACCOUNT ?</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Image
                  source={R.images.Plus}
                  style={{ height: 20, width: 20 }}
                />
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
