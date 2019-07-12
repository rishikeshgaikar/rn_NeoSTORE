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
        <View style={style.login_c1}>
          <Heading>NeoSTORE</Heading>
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
          <RoundButton>LOGIN</RoundButton>
          <TouchableHighlight
            underlayColor="transparent"
            style={{ alignItems: "center" }}
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          >
            <Text style={style.whiteText}>FORGOT PASSWORD?</Text>
          </TouchableHighlight>
          <Spinner />
        </View>
        <View style={style.login_c2}>
          <View style={{ flex: 5, padding: 20 }}>
            <Text style={style.whiteText}>DO YOU HAVE AN ACCOUNT ?</Text>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <TouchableHighlight
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
