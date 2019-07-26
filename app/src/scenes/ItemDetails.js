import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Modal,
  TextInput
} from "react-native";
import { RedButton, Rating, StarRating } from "../components";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";

export default class ItemDetails extends Component {
  constructor() {
    super();
    this.state = {
      access_token: "",
      dataSource: [],
      productImages: [],
      bigImage: "",
      ratingModalVisible: false,
      quantityModalVisible: false,
      ratedByUser: null,
      quantity: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const product_id = navigation.getParam("productID", "1");

    const fetchConfig = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${product_id}`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.data,
            productImages: responseJson.data.product_images,
            bigImage: responseJson.data.product_images[0].image
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderImages() {
    return this.state.productImages.map(test => {
      return (
        <TouchableOpacity
          onPress={() => this.setState({ bigImage: test.image })}
          key={test.image}
          style={{ margin: 15 }}
        >
          <Image
            style={{ width: 75, height: 75 }}
            source={{ uri: test.image }}
          />
        </TouchableOpacity>
      );
    });
  }

  renderBigImage() {
    if (this.state.bigImage.length > 0) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 15
          }}
        >
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: this.state.bigImage }}
          />
        </View>
      );
    }
  }

  ratebuttonClick() {
    this.setratingModalVisible(!this.state.ratingModalVisible);
    console.log("userRating: " + this.state.ratedByUser);
    this.userRating();
  }

  bnbuttonClick() {
    this.setquantityModalVisible(!this.state.quantityModalVisible);
    this.addToCart();
  }

  setratingModalVisible(visible) {
    this.setState({ ratingModalVisible: visible });
    // console.log(this.state.ratedByUser);
  }
  setquantityModalVisible(visible) {
    this.setState({ quantityModalVisible: visible });
    // console.log(this.state.ratedByUser);
  }

  myCallback = rating => {
    // console.log("testing" + rating);
    this.setState({ ratedByUser: rating });
  };

  userRating() {
    const { navigation } = this.props;
    const user_rating = this.state.ratedByUser;
    const product_id = navigation.getParam("productID", "1");
    const fetchConfig = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `product_id=${product_id}&rating=${user_rating}`
    };
    console.log(fetchConfig);
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/products/setRating`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async addToCart() {
    const token = await AsyncStorage.getItem("@NeoSTORE_at");
    const { navigation } = this.props;
    const quantity = this.state.quantity;
    console.log(this.state.quantity);
    const product_id = navigation.getParam("productID", "1");
    const fetchConfig = {
      method: "POST",
      headers: {
        access_token: token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `product_id=${product_id}&quantity=${quantity}`
    };
    console.log(fetchConfig);
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/addToCart`,
      fetchConfig
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    var self = this;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 10 }}>
          <ScrollView nestedScrollEnabled>
            <View style={{ padding: 15 }}>
              <Text style={{ fontFamily: R.fonts.GothamBook, fontSize: 20 }}>
                {this.state.dataSource.name}
              </Text>
              <Text style={{ fontStyle: "italic" }}>
                {this.state.dataSource.producer}
              </Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 5 }}>
                  <Text
                    style={{
                      color: R.colors.r2,
                      fontSize: 20,
                      fontFamily: R.fonts.GothamBold
                    }}
                  >
                    Rs. {this.state.dataSource.cost}
                  </Text>
                </View>
                <StarRating count={this.state.dataSource.rating} />
              </View>
              {this.renderBigImage()}
              <ScrollView
                nestedScrollEnabled
                horizontal
                pagingEnabled
                snapToAlignment={"center"}
                showsHorizontalScrollIndicator={true}
              >
                {this.renderImages()}
              </ScrollView>
              <Text
                style={{
                  fontFamily: R.fonts.GothamBook,
                  fontWeight: "bold",
                  fontSize: 20
                }}
              >
                Description:
              </Text>
              <Text>{this.state.dataSource.description}</Text>
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <RedButton
              onPress={() => {
                this.setquantityModalVisible(true);
              }}
            >
              BUY NOW
            </RedButton>
          </View>
          <View style={{ flex: 1 }}>
            <RedButton
              onPress={() => {
                this.setratingModalVisible(true);
              }}
            >
              RATE
            </RedButton>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.ratingModalVisible}
          >
            <View style={{ flex: 1 }}>
              <View opacity={0.5} style={{ flex: 5, backgroundColor: "#000" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.setratingModalVisible(!this.state.ratingModalVisible)
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
                  height: 400
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: R.fonts.GothamBook,
                    padding: 20
                  }}
                >
                  {this.state.dataSource.name}
                </Text>
                <Image
                  style={{ width: 200, height: 200, marginBottom: 20 }}
                  source={{ uri: this.state.bigImage }}
                />
                <Rating
                  callbackFromParent={this.myCallback}
                  rating={1}
                  max={5}
                  iconWidth={24}
                  iconHeight={24}
                  iconSelected={require("../../res/images/airbnb-star-selected.png")}
                  iconUnselected={require("../../res/images/airbnb-star-unselected.png")}
                  onRate={rating => this.setState({ rating: rating })}
                />
                <View style={{ width: "80%" }}>
                  <RedButton
                    onPress={() => {
                      this.ratebuttonClick();
                    }}
                  >
                    RATE
                  </RedButton>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.quantityModalVisible}
          >
            <View style={{ flex: 1 }}>
              <View opacity={0.5} style={{ flex: 5, backgroundColor: "#000" }}>
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
                  height: 400
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: R.fonts.GothamBook,
                    padding: 20
                  }}
                >
                  {this.state.dataSource.name}
                </Text>
                <Image
                  style={{ width: 200, height: 200 }}
                  source={{ uri: this.state.bigImage }}
                />
                <TextInput
                  placeholder="Enter quantity"
                  onChangeText={quantity =>
                    this.setState({ quantity: quantity })
                  }
                  style={{
                    fontSize: 20,
                    fontFamily: R.fonts.GothamBook,
                    padding: 20
                  }}
                />
                <View style={{ width: "80%" }}>
                  <RedButton onPress={() => this.bnbuttonClick()}>
                    ADD TO CART
                  </RedButton>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
