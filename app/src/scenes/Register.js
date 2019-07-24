import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { RoundButton, Heading, Input } from "../components";
import style from "../Styles";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      gender: "M",
      phone_no: "",
      M: R.images.chkn,
      F: R.images.chkn,
      checkButtonCondition: false
    };
  }

  Register() {
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const email = this.state.email;
    const password = this.state.password;
    const confirm_password = this.state.confirm_password;
    const gender = this.state.gender;
    const phone_no = this.state.phone_no;

    const fetchConfig = {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `first_name=${first_name}&last_name=${last_name}&email=${email}&password=${password}&confirm_password=${confirm_password}&phone_no=${phone_no}&gender=${gender}`
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/users/register`,
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

  changeCheckButton() {
    this.setState({ checkButtonCondition: !this.state.checkButtonCondition });
  }
  changeRadioButton(n) {
    switch (n) {
      case 0:
        this.setState({
          gender: "M",
          M: R.images.chky,
          F: R.images.chkn
        });
        break;
      case 1:
        this.setState({
          gender: "F",
          M: R.images.chkn,
          F: R.images.chky
        });
        break;
      default:
        this.setState({
          gender: "M",
          M: R.images.chky,
          F: R.images.chkn
        });
    }

    console.log(n);
    console.log(this.state.gender);
  }

  checkButtonImage() {
    if (this.state.checkButtonCondition) {
      return <Image source={R.images.checked_icon} />;
    } else {
      return <Image source={R.images.uncheck_icon} />;
    }
  }

  render() {
    console.log(this.state.dataSource);
    console.log(this.state.gender);
    return (
      <ScrollView contentContainerStyle={style.redContainer}>
        <StatusBar backgroundColor={R.colors.r2} />
        <Heading>NeoSTORE</Heading>
        <Input
          image={R.images.username_icon}
          placeholder="First Name"
          placeholderColor={R.colors.b1}
          onChangeText={first_name => this.setState({ first_name })}
        />
        <Input
          image={R.images.username_icon}
          placeholder="Last Name"
          placeholderColor={R.colors.b1}
          onChangeText={last_name => this.setState({ last_name })}
        />
        <Input
          image={R.images.email_icon}
          placeholder="Email"
          placeholderColor={R.colors.b1}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          image={R.images.password_icon}
          placeholder="Password"
          placeholderColor={R.colors.b1}
          onChangeText={password => this.setState({ password })}
        />
        <Input
          image={R.images.password_icon}
          placeholder="Confirm Password"
          placeholderColor={R.colors.b1}
          onChangeText={confirm_password => this.setState({ confirm_password })}
        />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 30,
            paddingTop: 20,
            paddingBottom: 10
          }}
        >
          <Text style={style.whiteText}>Gender</Text>
          <TouchableOpacity
            style={{ paddingHorizontal: 20 }}
            onPress={() => this.changeRadioButton(0)}
          >
            <Image source={this.state.M} />
          </TouchableOpacity>
          <Text style={style.whiteText}>MALE</Text>
          <TouchableOpacity
            style={{ paddingHorizontal: 20 }}
            onPress={() => this.changeRadioButton(1)}
          >
            <Image source={this.state.F} />
          </TouchableOpacity>
          <Text style={style.whiteText}>FEMALE</Text>
        </View>
        <Input
          image={R.images.cellphone}
          placeholder="Phone Number"
          placeholderColor={R.colors.b1}
          onChangeText={phone_no => this.setState({ phone_no })}
        />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 30,
            paddingTop: 20
          }}
        >
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => this.changeCheckButton()}
          >
            {this.checkButtonImage()}
          </TouchableOpacity>
          <Text style={style.whiteText}>I agree Terms & Conditions.</Text>
        </View>
        <RoundButton onPress={() => this.Register()}>REGISTER</RoundButton>
      </ScrollView>
    );
  }
}
