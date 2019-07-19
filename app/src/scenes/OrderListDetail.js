import React, { Component } from "react";
import { Text, View, FlatList, Image } from "react-native";

export default class OrderListDetail extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      address: "",
      cost: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: "OrderID: " + navigation.getParam("OrderID", "2016")
  });

  componentDidMount() {
    const { navigation } = this.props;
    const order_id = navigation.getParam("OrderID", "2016");

    const fetchConfig = {
      method: "GET",
      headers: {
        access_token: "5d26f6e5afd42",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/orderDetail?order_id=${order_id}`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.data.order_details,
            cost: responseJson.data.cost,
            address: responseJson.data.address
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
        <Text>Shipping Address: {this.state.address}</Text>

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={{ uri: item.prod_image }}
                />
              </View>
              <View style={{ flex: 4 }}>
                <Text>{item.prod_name}</Text>
                <Text>{item.prod_cat_name}</Text>
                <Text>{item.quantity}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>{item.total}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text>Total:{this.state.cost}</Text>
      </View>
    );
  }
}
