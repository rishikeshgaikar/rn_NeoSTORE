import React, { Component } from "react";
import { View, Text } from "react-native";
import { RoundButton, Spinner } from "../components";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <RoundButton onPress={() => alert("test")}>Logout</RoundButton>
        <Spinner />
      </View>
    );
  }
}
