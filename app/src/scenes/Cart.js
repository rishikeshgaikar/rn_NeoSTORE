import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Modal,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput
} from "react-native";
import R from "../R";
import { RedButton } from "../components";
import AsyncStorage from "@react-native-community/async-storage";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      access_token: "",
      dataSource: [],
      cartCount: "",
      cartTotal: "",
      tempProductId: "",
      editCartQuantity: "",
      quantityModalVisible: false
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("@NeoSTORE_at");
    this.setState({ access_token: token });
    console.log(token);
    const fetchConfig = {
      method: "GET",
      headers: {
        access_token: token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
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
    const product_id = this.state.tempProductId;
    console.log("Editcart" + product_id);
    const quantity = this.state.editCartQuantity;
    console.log("editcart" + quantity);
    const fetchConfig = {
      method: "POST",
      headers: {
        access_token: this.state.access_token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `product_id=${product_id}&quantity=${quantity}`
    };
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
        access_token: this.state.access_token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `product_id=${product_id}`
    };

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

  setquantityModalVisible(visible) {
    this.setState({ quantityModalVisible: visible });
    // console.log(this.state.ratedByUser);
  }

  ecb(n, id) {
    this.setquantityModalVisible(n);
    console.log(n);
    console.log(id);
    this.setState({ tempProductId: id });
    console.log("ecd" + this.state.tempProductId);
    console.log("ecd" + this.state.editCartQuantity);
  }

  callEdit() {
    this.setquantityModalVisible(false);
    this.editCart();
  }

  render() {
    if (this.state.cartCount > 0) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 9 }}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row", marginVertical: 15 }}>
                  <View style={{ flex: 1, padding: 30 }}>
                    <Image
                      style={{ width: 75, height: 75 }}
                      source={{ uri: item.product.product_images }}
                    />
                  </View>
                  <View style={{ flex: 4 }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 4 }}>
                        <Text
                          style={{
                            fontFamily: R.fonts.GothamBook,
                            fontSize: 20,
                            fontWeight: "bold"
                          }}
                        >
                          {item.product.name}
                        </Text>
                        <Text style={{ fontStyle: "italic" }}>
                          Category: {item.product.product_category}
                        </Text>
                      </View>
                      <View style={{ flex: 2 }}>
                        <TouchableOpacity
                          onPress={() => this.deleteCart(item.product.id)}
                        >
                          <Image
                            style={{
                              height: 60,
                              width: 60,
                              paddingTop: 40
                            }}
                            source={R.images.delete}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 4 }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.ecb(true, item.product_id);
                          }}
                        >
                          <ImageBackground
                            source={R.images.select_button}
                            style={{ width: 75, height: 50 }}
                          >
                            <View
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 30,
                                bottom: 5,
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <Text
                                style={{ fontWeight: "bold", fontSize: 17 }}
                              >
                                {item.quantity}
                              </Text>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 3 }}>
                        <Text
                          style={{
                            color: R.colors.r2,
                            fontSize: 20,
                            fontFamily: R.fonts.GothamBook,
                            fontWeight: "bold",
                            paddingTop: 10
                          }}
                        >
                          Rs. {item.product.cost}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.quantityModalVisible}
            >
              <View style={{ flex: 1 }}>
                <View
                  opacity={0.5}
                  style={{ flex: 5, backgroundColor: "#000" }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setquantityModalVisible(
                        !this.state.quantityModalVisible
                      )
                    }
                    style={{ flex: 1 }}
                  />
                </View>
                <View
                  style={{
                    // flex: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    height: 200
                  }}
                >
                  <TextInput
                    placeholder="Enter quantity"
                    onChangeText={quantity =>
                      this.setState({ editCartQuantity: quantity })
                    }
                    style={{
                      fontSize: 20,
                      fontFamily: R.fonts.GothamBook,
                      padding: 20
                    }}
                  />
                  <View style={{ width: "80%" }}>
                    <RedButton onPress={() => this.callEdit()}>
                      ADD TO CART
                    </RedButton>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{ flex: 1, marginHorizontal: 20, flexDirection: "row" }}>
            <View style={{ flex: 4, paddingLeft: 20 }}>
              <Text
                style={{
                  fontFamily: R.fonts.GothamBook,
                  fontSize: 20,
                  fontWeight: "bold"
                }}
              >
                Total items:
              </Text>
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
                {this.state.cartCount}
              </Text>
              <Text
                style={{
                  fontFamily: R.fonts.GothamBook,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: R.colors.r2
                }}
              >
                Rs. {this.state.cartTotal}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <RedButton
              onPress={() => this.props.navigation.navigate("AddressSelection")}
            >
              ORDER NOW
            </RedButton>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image source={R.images.empty_cart} />
          <Text
            style={{
              fontSize: 20,
              fontFamily: R.fonts.GothamBook,
              paddingTop: 20
            }}
          >
            YOUR CART IS EMPTY!!
          </Text>
        </View>
      );
    }
  }
}
