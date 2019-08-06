import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../api";

export default class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      access_token: "",
      dataSource: []
    };
  }

  componentDidMount() {
    const method = "GET";
    const url = "orderList";
    return api(url, method, null)
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
              style={{ margin: 10 }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text
                    style={{ fontFamily: R.fonts.GothamBook, fontSize: 20 }}
                  >
                    Order Id: {item.id}
                  </Text>
                  <Text
                    style={{ fontFamily: R.fonts.GothamBook, fontSize: 15 }}
                  >
                    Date: {item.created}
                  </Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      fontFamily: R.fonts.GothamBook,
                      color: R.colors.r2,
                      fontSize: 20,
                      fontWeight: "bold"
                    }}
                  >
                    Rs.{item.cost}
                  </Text>
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
