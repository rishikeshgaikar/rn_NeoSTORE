import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { Heading, Spinner } from "../components";
import style from "../Styles";
import AsyncStorage from "@react-native-community/async-storage";

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.checkUser();
  }

  async checkUser() {
    const { navigate } = this.props.navigation;
    try {
      const value = await AsyncStorage.getItem("@NeoSTORE_at");
      if (value !== null) {
        navigate("Home");
      } else {
        navigate("Login");
      }
    } catch (e) {
      console.log("Error retrieving data" + e);
    }
  }
  // renderStacks() {
  //   const { navigate } = this.props.navigation;
  //   setTimeout(function() {
  //     console.log("After 5 Sec");

  //     const i = true;
  //     if (i) {
  //       navigate("Login");
  //     } else {
  //       navigate("Home");
  //     }
  //   }, 1000);
  //   console.log("before Sec");
  // }

  render() {
    return (
      <View style={style.redContainer}>
        <Heading>NeoSTORE</Heading>
        <Spinner />
        {/* {this.checkUser()} */}
      </View>
    );
  }
}
