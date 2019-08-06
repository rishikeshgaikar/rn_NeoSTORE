import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Picker
} from "react-native";
import R from "../R";
import { RedButton } from "../components";
import api from "../api";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      access_token: "",
      dataSource: [],
      cartCount: "",
      cartTotal: "",
      pickerValue: null
    };
  }

  componentDidMount() {
    this.showCart();
  }

  showCart() {
    const url = "cart";
    const method = "GET";
    return api(url, method, null)
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

  editCart(id, quant) {
    const product_id = id;
    const quantity = quant;
    const body = `product_id=${product_id}&quantity=${quantity}`;
    const method = "POST";
    const url = "editCart";
    api(url, method, body)
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status == 200) {
          console.log(responseJson.status);
          this.showCart();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteCart(id) {
    const product_id = id;
    const body = `product_id=${product_id}`;
    const method = "POST";
    const url = "deleteCart";
    api(url, method, body)
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status == 200) {
          console.log(responseJson.status);
          this.showCart();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderPicker(itemId, itemQuant, iVal) {
    return (
      <Picker
        style={{ width: 100, height: 50 }}
        selectedValue={
          this.state["pickValue" + iVal] == null
            ? itemQuant
            : this.state["pickValue" + iVal]
        }
        onValueChange={value => {
          this.setState({ ["pickValue" + iVal]: value });
          console.log("selected value" + value);
          console.log("itemid:" + itemId);

          this.editCart(itemId, value);
        }}
      >
        {/* <Picker.Item label={itemQuant.toString()} quantity value={itemQuant} /> */}
        <Picker.Item label="1" value={1} />
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
        <Picker.Item label="5" value={5} />
        <Picker.Item label="6" value={6} />
        <Picker.Item label="7" value={7} />
      </Picker>
    );
  }

  render() {
    if (this.state.cartCount > 0) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 9 }}>
            <FlatList
              data={this.state.dataSource}
              extraData={{ value: [this.state.pickerValue] }}
              renderItem={({ item, index }) => (
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
                        {this.renderPicker(
                          item.product_id,
                          item.quantity,
                          index
                        )}
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
