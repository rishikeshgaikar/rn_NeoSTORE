import React, { Component } from "react";
import { Text, View, FlatList, Image } from "react-native";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../api";

export default class OrderListDetail extends Component {
  constructor() {
    super();
    this.state = {
      access_token: "",
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
    const method = "GET";
    const url = `orderDetail?order_id=${order_id}`;
    return api(url, method, null)
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
        <Text
          style={{ fontFamily: R.fonts.GothamBook, fontSize: 15, padding: 10 }}
        >
          Shipping Address: {this.state.address}
        </Text>

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", margin: 10 }}>
              <View style={{ flex: 1 }}>
                <Image
                  style={{ height: 70, width: 70 }}
                  source={{ uri: item.prod_image }}
                />
              </View>
              <View style={{ flex: 2, paddingLeft: 15 }}>
                <Text
                  style={{
                    fontFamily: R.fonts.GothamBook,
                    fontSize: 15,
                    fontWeight: "bold"
                  }}
                >
                  {item.prod_name}
                </Text>
                <Text
                  style={{
                    fontFamily: R.fonts.GothamBook,
                    fontStyle: "italic"
                  }}
                >
                  Category: {item.prod_cat_name}
                </Text>
                <Text>Quantity: {item.quantity}</Text>
              </View>
              <View style={{ flex: 1, paddingTop: 30 }}>
                <Text
                  style={{
                    fontFamily: R.fonts.GothamBook,
                    fontSize: 15,
                    color: R.colors.r2,
                    fontWeight: "bold"
                  }}
                >
                  Rs. {item.total}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 4, paddingLeft: 20 }}>
            <Text
              style={{
                fontFamily: R.fonts.GothamBook,
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              Grand Total:
            </Text>
          </View>
          <View style={{ flex: 2, paddingLeft: 20 }}>
            <Text
              style={{
                fontFamily: R.fonts.GothamBook,
                fontSize: 20,
                fontWeight: "bold",
                color: R.colors.r2
              }}
            >
              Rs. {this.state.cost}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
