import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";

export default class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    const fetchConfig = {
      method: "GET",
      headers: {
        access_token: "5d26f6e5afd42",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    console.log(fetchConfig);
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/orderList`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.data
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
    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("OrderListDetail", {
                  OrderID: item.id
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text>Order Id: {item.id}</Text>
                  <Text>Order Date{item.created}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>{item.cost}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
