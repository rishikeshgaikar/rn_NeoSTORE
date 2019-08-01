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
import { RoundButton, Heading, Input, Spinner } from "../components";
import style from "../Styles";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";
import { api } from "../api";

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
      checkButtonCondition: false,
      isLoading: false
    };
  }

  Register() {
    if (this.state.checkButtonCondition) {
      const first_name = this.state.first_name;
      const last_name = this.state.last_name;
      const email = this.state.email;
      const password = this.state.password;
      const confirm_password = this.state.confirm_password;
      const gender = this.state.gender;
      const phone_no = this.state.phone_no;
      const method = "POST";
      const body = `first_name=${first_name}&last_name=${last_name}&email=${email}&password=${password}&confirm_password=${confirm_password}&phone_no=${phone_no}&gender=${gender}`;
      const url = "users/register";
      return api(url, method, null, body)
        .then(responseJson => {
          this.setState({ dataSource: responseJson }, function() {}),
            this.isSuccessfull();
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      alert("Please Check Terms & Conditions");
    }
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
      return (
        <View style={{ height: 200 }}>
          <Spinner />
        </View>
      );
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
  }

  checkButtonImage() {
    if (this.state.checkButtonCondition) {
      return <Image source={R.images.checked_icon} />;
    } else {
      return <Image source={R.images.uncheck_icon} />;
    }
  }

  render() {
    return (
      <View style={style.redContainer}>
        <StatusBar backgroundColor={R.colors.r2} />
        <ScrollView>
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
            keyboardType="email-address"
          />
          <Input
            image={R.images.password_icon}
            placeholder="Password"
            placeholderColor={R.colors.b1}
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
          />
          <Input
            image={R.images.password_icon}
            placeholder="Confirm Password"
            placeholderColor={R.colors.b1}
            onChangeText={confirm_password =>
              this.setState({ confirm_password })
            }
            secureTextEntry={true}
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
            keyboardType="number-pad"
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
          <RoundButton
            disabled={this.state.isLoading}
            onPress={() => this.Register()}
          >
            REGISTER
          </RoundButton>
          {this.showSpinner()}
        </ScrollView>
      </View>
    );
  }
}
