import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
  Button
} from "react-native";
import { RoundButton, Heading, Input } from "../components";
import style from "../Styles";
import R from "../R";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      email: "",
      text: false
    };
  }

  Forgot() {
    const email = this.state.email;
    const fetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `email=${email}`
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/users/forgot`,
      fetchConfig
    )
      .then(response => response.json())
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
      this.setState({ text: true });
      this.changeMSG();
    } else if (this.state.dataSource.status == 401) {
      alert("" + this.state.dataSource.user_msg);
    } else if (this.state.dataSource.status == 400) {
      alert("" + this.state.dataSource.user_msg);
    } else {
      alert("Something Went Wrong");
    }
  }

  changeMSG() {
    if (this.state.text) {
      return (
        <Text style={style.whiteText}>
          Kindly go back to login page and login with new password sent on your
          email.
        </Text>
      );
    } else {
      return (
        <Text style={style.whiteText}>
          Your new password will be sent on your email.
        </Text>
      );
    }
  }

  render() {
    return (
      <View style={style.redContainer}>
        <StatusBar backgroundColor={R.colors.r2} />
        <View style={{ flex: 10, justifyContent: "center" }}>
          <Heading>NeoSTORE</Heading>
          <Input
            image={R.images.email_icon}
            placeholder="Email"
            placeholderColor={R.colors.b1}
            onChangeText={email => this.setState({ email })}
          />
          <RoundButton onPress={() => this.Forgot()}>
            FORGOT PASSWORD
          </RoundButton>
          <View style={{ paddingHorizontal: 40 }}>{this.changeMSG()}</View>
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <View style={{ flex: 5, padding: 20 }}>
            <Text style={style.whiteText}>DO YOU HAVE AN ACCOUNT ?</Text>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <TouchableHighlight
              disabled={this.state.isLoading}
              underlayColor="transparent"
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Image source={R.images.Plus} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
