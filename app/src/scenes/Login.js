import React, { Component } from "react";
import { View, Text, StatusBar, Image } from "react-native";
import { RoundButton, Spinner, Heading, Input } from "../components";
import style from "../Styles";
import R from "../R";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.redContainer}>
        <View>
          <StatusBar backgroundColor={R.colors.r2} />
          <Heading>Login</Heading>
          <Input
            image={R.images.username_icon}
            placeholder="Username"
            placeholderColor={R.colors.b1}
          />
          <Input
            image={R.images.password_icon}
            placeholder="Password"
            placeholderColor={R.colors.b1}
          />
          <RoundButton>Login</RoundButton>
          <Spinner />
        </View>
        <View>
          <Text>DO YOU HAVE AN ACCOUNT ?</Text>
        </View>
        <View>
          <Image source={R.images.Plus} />
        </View>
      </View>
    );
  }
}
