import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class AddressSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "Neosoft Prabhadevi"
    };
  }

  orderNow() {
    const address = this.state.address;
    const fetchConfig = {
      method: "POST",
      headers: {
        access_token: "5d36e102b8e67",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `address=${address}`
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/order`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => console.log(responseJson))
      .catch(error => {
        console.error(error);
      });
    console.log("pressed");
  }

  render() {
    return (
      <View>
        <Button title="Place order" onPress={() => this.orderNow()} />
      </View>
    );
  }
}
