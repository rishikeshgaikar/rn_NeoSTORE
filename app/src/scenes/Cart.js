import React, { Component } from "react";
import { Text, View, Button, FlatList, Image } from "react-native";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      cartCount: "",
      cartTotal: "",
      editCartQuantity: 10
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
      `http://staging.php-dev.in:8844/trainingapp/api/cart`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.data,
            cartCount: responseJson.count,
            cartTotal: responseJson.total
          },

          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  editCart(id) {
    const product_id = id;
    const quantity = "5";
    const fetchConfig = {
      method: "POST",
      headers: {
        access_token: "5d26f6e5afd42",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `product_id=${product_id}&quantity=${quantity}`
    };
    console.log(fetchConfig);
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/editCart`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status == 200) {
          console.log(responseJson.status);
          this.componentDidMount();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  deleteCart(id) {
    const product_id = id;
    const fetchConfig = {
      method: "POST",
      headers: {
        access_token: "5d26f6e5afd42",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `product_id=${product_id}`
    };
    console.log(fetchConfig);
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/deleteCart`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status == 200) {
          console.log(responseJson.status);
          this.componentDidMount();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state.dataSource);

    this.state.dataSource.map(test => {
      console.log(test.quantity);
      console.log(test.product.cost);
      console.log(test.product.product_images);
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 9 }}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: item.product.product_images }}
                  />
                </View>
                <View style={{ flex: 4 }}>
                  <Text>{item.product.name}</Text>
                  <Text>{item.product.product_id}</Text>
                  <Text>{item.product.product_category}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 2 }}>
                      <Text>{item.quantity}</Text>
                      <Button
                        title="<edit>"
                        onPress={() =>
                          this.editCart(
                            item.product.id,
                            this.state.editCartQuantity
                          )
                        }
                      />
                      <Button
                        title="<delete>"
                        onPress={() => this.deleteCart(item.product.id)}
                      />
                    </View>
                    <View style={{ flex: 4 }}>
                      <Text>{item.product.cost}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text> Total items: {this.state.cartCount} </Text>
          <Text> Total price: {this.state.cartTotal} </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title=" order now"
            onPress={() => this.props.navigation.navigate("AddressSelection")}
          />
        </View>
      </View>
    );
  }
}
