import React, { Component } from "react";
import { View, Text, StatusBar, Image, TouchableHighlight } from "react-native";
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
        <StatusBar backgroundColor={R.colors.r2} />
        <Heading>NeoSTORE</Heading>
        <Input
          image={R.images.username_icon}
          placeholder="Current Password"
          placeholderColor={R.colors.b1}
        />
        <Input
          image={R.images.username_icon}
          placeholder="New Password"
          placeholderColor={R.colors.b1}
        />
        <Input
          image={R.images.password_icon}
          placeholder="Confirm Password"
          placeholderColor={R.colors.b1}
        />
        <RoundButton>RESET PASSWORD</RoundButton>
      </View>
    );
  }
}
