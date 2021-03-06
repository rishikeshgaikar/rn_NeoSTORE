import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { RoundButton, Heading, Input } from '../components';
import style from '../Styles';
import R from '../R';
import api from '../api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      email: ''
    };
  }

  Forgot() {
    const email = this.state.email;
    const body = `email=${email}`;
    const url = 'users/forgot';
    const method = 'POST';

    return api(url, method, body)
      .then(responseJson => {
        this.setState({ dataSource: responseJson }, function() {});
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
    console.log(this.state.dataSource);
    return (
      <SafeAreaView style={style.redContainer}>
        <ScrollView contentContainerStyle={style.redContainer}>
          <StatusBar backgroundColor={R.colors.r2} />
          <View style={{ flex: 10, justifyContent: 'center' }}>
            <Heading>NeoSTORE</Heading>
            <Input
              image={R.images.email_icon}
              placeholder='Email'
              placeholderColor={R.colors.b1}
              onChangeText={email => this.setState({ email })}
              keyboardType='email-address'
            />
            <RoundButton onPress={() => this.Forgot()}>
              FORGOT PASSWORD
            </RoundButton>
          </View>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <TouchableHighlight
              disabled={this.state.isLoading}
              underlayColor='transparent'
              onPress={() => this.props.navigation.navigate('Register')}
            >
              <Text style={style.whiteText}>
                DO YOU HAVE AN ACCOUNT ? SIGN UP HERE !
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
