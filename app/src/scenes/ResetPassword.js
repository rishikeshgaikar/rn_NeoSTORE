import React, { Component } from "react";
import { View, Text, StatusBar, Image, TouchableHighlight } from "react-native";
import { RoundButton, Spinner, Heading, Input } from "../components";
import style from "../Styles";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";
import { api } from "../api";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      pass: "",
      confirmPass: "",
      isLoading: false,
      dataSource: []
    };
  }

  async resetPass() {
    const oldPass = "1";
    const pass = this.state.pass;
    const confirmPass = this.state.confirmPass;
    const at = await AsyncStorage.getItem("@NeoSTORE_at");
    const method = "POST";
    const body = `old_password=${oldPass}&password=${pass}&confirm_password=${confirmPass}`;
    const url = "users/change";
    return api(url, method, at, body)
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
      this.setState({
        isLoading: !this.state.isLoading
      });
      setTimeout(function() {
        navigate("UserProfile");
      }, 2000);
      alert("" + this.state.dataSource.user_msg);
    } else if (this.state.dataSource.status == 401) {
      alert("" + this.state.dataSource.user_msg);
    } else if (this.state.dataSource.status == 400) {
      alert("" + this.state.dataSource.user_msg);
    } else {
      alert("Something Went Wrong");
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
    console.log(this.state.dataSource);
    return (
      <View style={style.redContainer}>
        <StatusBar backgroundColor={R.colors.r2} />
        <Heading>NeoSTORE</Heading>
        <Input
          image={R.images.username_icon}
          placeholder="Current Password"
          placeholderColor={R.colors.b1}
          onChangeText={oldPass => this.setState({ oldPass })}
          secureTextEntry={true}
        />
        <Input
          image={R.images.username_icon}
          placeholder="New Password"
          placeholderColor={R.colors.b1}
          onChangeText={pass => this.setState({ pass })}
          secureTextEntry={true}
        />
        <Input
          image={R.images.password_icon}
          placeholder="Confirm Password"
          placeholderColor={R.colors.b1}
          onChangeText={confirmPass => this.setState({ confirmPass })}
          secureTextEntry={true}
        />
        <RoundButton onPress={() => this.resetPass()}>
          RESET PASSWORD
        </RoundButton>
        {this.showSpinner()}
      </View>
    );
  }
}
