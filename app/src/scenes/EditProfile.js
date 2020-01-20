import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { RoundButton, Spinner, Input, RoundImage } from '../components';
import style from '../Styles';
import R from '../R';
import api from '../api';
import CartContext from '../context/CartContext';
import ImagePicker from 'react-native-image-picker';

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
      profile_pic: '',
      isLoading: false
    };
  }

  updateUser(contextValue) {
    // const first_name = this.state.first_name;
    // const last_name = this.state.last_name;
    // const email = this.state.email;
    // const phone_no = this.state.phone_no;
    // const dob = this.state.dob;
    // const b64img = this.state.profile_pic;
    // const method = 'POST';
    // const url = 'users/update';
    // const body = `first_name=${first_name}&last_name=${last_name}&email=${email}&dob=${dob}&phone_no=${phone_no}&profile_pic=${b64img}`;
    const first_name = 'test';
    const last_name = 'test';
    const email = 'rishi07@gmail.com';
    const phone_no = '1231231231';
    const dob = '12-12-12-1212';
    const b64img = this.state.profile_pic;
    const method = 'POST';
    const url = 'users/update';
    const body = `first_name=${first_name}&last_name=${last_name}&email=${email}&dob=${dob}&phone_no=${phone_no}&profile_pic=${b64img}`;
    console.log(body);
    return api(url, method, body)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ dataSource: responseJson }), this.isSuccessfull();
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

  choosePhoto() {
    const options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' }
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('data:image/jpeg;base64,' + response.data);
      this.setState({ profile_pic: 'data:image/jpeg;base64,' + response.data });
    });
  }

  renderSelectedImage() {
    if (this.state.profile_pic == '') {
      return <RoundImage />;
    } else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20
          }}
        >
          <Image
            source={{ uri: this.state.profile_pic }}
            style={{
              height: 100,
              width: 100,
              padding: 20,
              borderRadius: 100,
              borderWidth: 3,
              borderColor: R.colors.b1
            }}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={style.redContainer}>
        <ScrollView>
          <View>
            <TouchableOpacity onPress={() => this.choosePhoto()}>
              {this.renderSelectedImage()}
              <View>
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingBottom: 20,
                    fontFamily: R.fonts.GothamMedium,
                    color: R.colors.b1
                  }}
                >
                  Tap here to change!
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
