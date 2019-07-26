import React, { Component } from "react";
import { View, Text, StatusBar, Image, TouchableHighlight } from "react-native";
import { RoundButton, Spinner, Heading, Input } from "../components";
import style from "../Styles";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";

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
    const token = await AsyncStorage.getItem("@NeoSTORE_at");

    const fetchConfig = {
      method: "POST",
      headers: {
        access_token: token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `old_password=${oldPass}&password=${pass}&confirm_password=${confirmPass}`
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/users/change`,
      fetchConfig
    )
      .then(response => response.json())
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
        />
        <Input
          image={R.images.username_icon}
          placeholder="New Password"
          placeholderColor={R.colors.b1}
          onChangeText={pass => this.setState({ pass })}
        />
        <Input
          image={R.images.password_icon}
          placeholder="Confirm Password"
          placeholderColor={R.colors.b1}
          onChangeText={confirmPass => this.setState({ confirmPass })}
        />
        <RoundButton onPress={() => this.resetPass()}>
          RESET PASSWORD
        </RoundButton>
        {this.showSpinner()}
      </View>
    );
  }
}
