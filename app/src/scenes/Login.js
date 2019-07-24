import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
  Button
} from "react-native";
import { RoundButton, Spinner, Heading, Input } from "../components";
import style from "../Styles";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      username: "",
      password: "",
      isLoading: false
    };
  }

  Login() {
    const username = this.state.username;
    const password = this.state.password;
    const fetchConfig = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `email=${username}&password=${password}`
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/users/login`,
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
      }),
        this.saveKey(
          "" + this.state.dataSource.data.first_name,
          "" + this.state.dataSource.data.last_name,
          "" + this.state.dataSource.data.email,
          "" + this.state.dataSource.data.access_token
        ),
        setTimeout(function() {
          navigate("Home");
        }, 2000);
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
      return <Spinner />;
    }
  }

  async saveKey(value1, value2, value3, value4) {
    const fname = ["@NeoSTORE_fname", value1];
    const lname = ["@NeoSTORE_lname", value2];
    const email = ["@NeoSTORE_email", value3];
    const access_token = ["@NeoSTORE_at", value4];
    try {
      await AsyncStorage.multiSet([fname, lname, email, access_token]);
    } catch (e) {
      console.log("Error retrieving data" + error);
    }

    console.log("Done.");
  }

  render() {
    return (
      <View style={style.redContainer}>
        <StatusBar backgroundColor={R.colors.r2} />
        <View style={{ flex: 10, justifyContent: "center" }}>
          <Heading>NeoSTORE</Heading>
          <Input
            image={R.images.username_icon}
            placeholder="Username"
            placeholderColor={R.colors.b1}
            onChangeText={username => this.setState({ username })}
          />
          <Input
            image={R.images.password_icon}
            placeholder="Password"
            placeholderColor={R.colors.b1}
            onChangeText={password => this.setState({ password })}
          />
          <RoundButton
            disabled={this.state.isLoading}
            onPress={() => this.Login()}
          >
            LOGIN
          </RoundButton>

          <TouchableHighlight
            underlayColor="transparent"
            style={{ alignItems: "center" }}
            disabled={this.state.isLoading}
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          >
            <Text style={style.whiteText}>FORGOT PASSWORD?</Text>
          </TouchableHighlight>
          {this.showSpinner()}
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
