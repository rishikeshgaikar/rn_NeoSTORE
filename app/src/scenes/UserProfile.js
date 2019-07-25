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

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    const fetchConfig = {
      method: "GET",
      headers: {
        access_token: "5d36e102b8e67",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/users/getUserData`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.data.user_data
          },

          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
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
