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
      email: ""
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
        this.setState(
          {
            dataSource: responseJson
          },

          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state.dataSource);
    console.log(this.state.email);
    return (
      <View style={style.redContainer}>
        <StatusBar backgroundColor={R.colors.r2} />
        <View style={style.login_c1}>
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
