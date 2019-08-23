import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { RoundButton, Spinner, Input, RoundImage } from '../components';
import style from '../Styles';
import R from '../R';
import api from '../api';
import CartContext from '../context/CartContext';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: '',
      dataSource: [],
      first_name: '',
      last_name: '',
      email: '',
      phone_no: '',
      dob: '',
      isLoading: false
    };
  }

  updateUser(contextValue) {
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const email = this.state.email;
    const phone_no = this.state.phone_no;
    const dob = this.state.dob;
    const method = 'POST';
    const url = 'users/update';
    const body = `first_name=${first_name}&last_name=${last_name}&email=${email}&dob=${dob}&profile_pic={"test.png"}&phone_no=${phone_no}`;

    return api(url, method, body)
      .then(responseJson => {
        this.setState({ dataSource: responseJson }, function() {}),
          this.isSuccessfull();
        contextValue.getUpdate();
      })
      .catch(error => {
        console.error(error);
      });
  }

  isSuccessfull() {
    const { navigate } = this.props.navigation;
    if (this.state.dataSource.status == 200) {
      this.setState({
        isLoading: !this.state.isLoading
      });

      setTimeout(function() {
        navigate('UserProfile');
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

  showSpinner() {
    if (this.state.isLoading) {
      return (
        <View style={{ height: 200 }}>
          <Spinner />
        </View>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={style.redContainer}>
        <ScrollView>
          <RoundImage />
          <Input
            image={R.images.username_icon}
            placeholder='First Name'
            placeholderColor={R.colors.b1}
            onChangeText={first_name => this.setState({ first_name })}
          />
          <Input
            image={R.images.username_icon}
            placeholder='Last Name'
            placeholderColor={R.colors.b1}
            onChangeText={last_name => this.setState({ last_name })}
          />
          <Input
            image={R.images.email_icon}
            placeholder='Email'
            placeholderColor={R.colors.b1}
            onChangeText={email => this.setState({ email })}
            keyboardType='email-address'
          />
          <Input
            image={R.images.cellphone}
            placeholder='PHONE NUMBER'
            placeholderColor={R.colors.b1}
            onChangeText={phone_no => this.setState({ phone_no })}
            keyboardType='number-pad'
          />
          <Input
            image={R.images.dob_icon}
            placeholder='DOB'
            placeholderColor={R.colors.b1}
            onChangeText={dob => this.setState({ dob })}
          />
          <CartContext.Consumer>
            {contextValue => (
              <RoundButton
                disabled={this.state.isLoading}
                onPress={() => {
                  this.updateUser(contextValue);
                }}
              >
                SUBMIT
              </RoundButton>
            )}
          </CartContext.Consumer>

          {this.showSpinner()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
