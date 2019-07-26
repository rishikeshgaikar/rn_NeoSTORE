import React, { Component } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { RedButton } from "../components";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";

export default class AddressSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      address: "",
      dataSource: []
    };
  }
  async orderNow() {
    const address = this.state.address;
    const token = await AsyncStorage.getItem("@NeoSTORE_at");
    console.log(token);
    const fetchConfig = {
      method: "POST",
      headers: {
        access_token: token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `address=${address}`
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/order`,
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
      setTimeout(function() {
        navigate("Home");
      }, 2000);
      alert("" + this.state.dataSource.user_msg);
    } else if (this.state.dataSource.status == 401) {
      alert("" + this.state.dataSource.user_msg);
    } else if (this.state.dataSource.status == 400) {
      alert("" + this.state.dataSource.user_msg);
    } else {
      alert("Something Went Wrong");
    }
  }

  render() {
    console.log(this.state.dataSource);
    return (
      <View>
        <Text
          style={{
            marginHorizontal: 20,
            fontFamily: R.fonts.GothamBook,
            fontSize: 20,
            marginTop: 20
          }}
        >
          Enter Delivery address
        </Text>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            borderRadius: 4,
            borderWidth: 2,
            borderColor: R.colors.b9
          }}
        >
          <TextInput
            placeholder="Enter Address"
            onChangeText={address => this.setState({ address })}
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <RedButton onPress={() => this.orderNow()}>PLACE ORDER</RedButton>
        </View>
      </View>
    );
  }
}
