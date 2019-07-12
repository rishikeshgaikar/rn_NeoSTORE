import React, { Component } from "react";
import { View, Text, StatusBar, Image, TouchableHighlight } from "react-native";
import { RoundButton, Heading, Input } from "../components";
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
          placeholder="First Name"
          placeholderColor={R.colors.b1}
        />
        <Input
          image={R.images.username_icon}
          placeholder="Last Name"
          placeholderColor={R.colors.b1}
        />
        <Input
          image={R.images.email_icon}
          placeholder="Email"
          placeholderColor={R.colors.b1}
        />
        <Input
          image={R.images.password_icon}
          placeholder="Password"
          placeholderColor={R.colors.b1}
        />
        <Input
          image={R.images.password_icon}
          placeholder="Confirm Password"
          placeholderColor={R.colors.b1}
        />
        <Input
          image={R.images.cellphone}
          placeholder="Phone Number"
          placeholderColor={R.colors.b1}
        />
        <RoundButton>REGISTER</RoundButton>
      </View>
    );
  }
}
