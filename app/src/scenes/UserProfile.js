import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet
} from "react-native";
import {
  RoundButton,
  Spinner,
  Heading,
  Input,
  RoundImage
} from "../components";
import style from "../Styles";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      dataSource: []
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("@NeoSTORE_at");
    console.log(token);
    const fetchConfig = {
      method: "GET",
      headers: {
        access_token: token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    console.log(fetchConfig);
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/users/getUserData`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.data.user_data
        });
        // console.log(responseJson);
        // console.log(responseJson.data);
        // console.log(responseJson.data.user_data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state.dataSource);
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          backgroundColor: R.colors.r2,
          height: "100%"
        }}
      >
        <RoundImage />
        <View style={inputStyle.c}>
          <View style={inputStyle.c1}>
            <Image source={R.images.username_icon} />
          </View>
          <View style={inputStyle.c2}>
            <Text style={inputStyle.textinput}>
              {this.state.dataSource.first_name}
            </Text>
          </View>
        </View>
        <View style={inputStyle.c}>
          <View style={inputStyle.c1}>
            <Image source={R.images.username_icon} />
          </View>
          <View style={inputStyle.c2}>
            <Text style={inputStyle.textinput}>
              {this.state.dataSource.last_name}
            </Text>
          </View>
        </View>
        <View style={inputStyle.c}>
          <View style={inputStyle.c1}>
            <Image source={R.images.email_icon} />
          </View>
          <View style={inputStyle.c2}>
            <Text style={inputStyle.textinput}>
              {this.state.dataSource.email}
            </Text>
          </View>
        </View>
        <View style={inputStyle.c}>
          <View style={inputStyle.c1}>
            <Image source={R.images.cellphone} />
          </View>
          <View style={inputStyle.c2}>
            <Text style={inputStyle.textinput}>
              {this.state.dataSource.phone_no}
            </Text>
          </View>
        </View>

        <RoundButton
          onPress={() => this.props.navigation.navigate("EditProfile")}
        >
          EDIT PROFILE
        </RoundButton>
        <RoundButton
          onPress={() => this.props.navigation.navigate("ResetPassword")}
        >
          RESET PASSWORD
        </RoundButton>
      </ScrollView>
    );
  }
}

const inputStyle = StyleSheet.create({
  textinput: {
    color: R.colors.b1,
    fontSize: 20,
    fontStyle: "normal",
    fontFamily: R.fonts.GothamBold
  },
  c: {
    marginTop: 10,
    marginHorizontal: 30,
    flexDirection: "row",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: R.colors.b1
  },
  c1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8
  },
  c2: {
    flex: 5,
    paddingVertical: 8
  }
});
