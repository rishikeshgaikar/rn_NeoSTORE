import React, { Component } from "react";
import { View, Text, StatusBar, Image, TouchableHighlight } from "react-native";
import {
  RoundButton,
  Spinner,
  Heading,
  Input,
  RoundImage
} from "../components";
import style from "../Styles";
import R from "../R";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.redContainer}>
        <RoundImage />
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
          image={R.images.cellphone}
          placeholder="PHONE NUMBER"
          placeholderColor={R.colors.b1}
        />
        <Input
          image={R.images.dob_icon}
          placeholder="DOB"
          placeholderColor={R.colors.b1}
        />
        <RoundButton>EDIT PROFILE</RoundButton>
        <RoundButton>RESET PASSWORD</RoundButton>
      </View>
    );
  }
}
