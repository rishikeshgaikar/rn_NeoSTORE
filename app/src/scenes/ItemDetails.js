import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Button,
  Modal
} from "react-native";
import { RoundButton } from "../components";
import Rating from "../components/Rating";
import { TextInput } from "react-native-gesture-handler";

export default class ItemDetails extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      productImages: [],
      bigImage: "",
      ratingModalVisible: false,
      quantityModalVisible: false,
      ratedByUser: null,
      quantity: null
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("productName", "Center Coffee Table")
  });

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
        >
          <Image
            style={{ width: 100, height: 200 }}
            source={{ uri: test.image }}
          />
        </TouchableOpacity>
      );
    });
  }

  renderBigImage() {
    if (this.state.bigImage.length > 0) {
      return (
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: this.state.bigImage }}
        />
      );
    }
  }

  buttonClick() {
    this.setratingModalVisible(!this.state.ratingModalVisible);
    console.log("userRating: " + this.state.ratedByUser);
    this.userRating();
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

  addToCart() {
    const { navigation } = this.props;
    const quantity = this.state.quantity;
    console.log(this.state.quantity);
    const product_id = navigation.getParam("productID", "1");
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
        <View style={{ flex: 4 }}>
          <ScrollView nestedScrollEnabled>
            <Text>{this.state.dataSource.name}</Text>
            <Text>{this.state.dataSource.cost}</Text>
            <Text>{this.state.dataSource.description}</Text>
            <Text>{this.state.dataSource.producer}</Text>
            <Text>{this.state.dataSource.rating}</Text>
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
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => {
              this.setquantityModalVisible(true);
            }}
            title="Buy Now"
          />
          <Button
            onPress={() => {
              this.setratingModalVisible(true);
            }}
            title="Rating"
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.ratingModalVisible}
          >
            <View
              style={{
                margin: 50,
                backgroundColor: "#fff"
              }}
            >
              <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: this.state.bigImage }}
              />
              <Text>{this.state.dataSource.name}</Text>
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
              <Button
                onPress={() => {
                  this.buttonClick();
                }}
                title="Rate"
              />
              <Button
                onPress={() => {
                  this.setratingModalVisible(!this.state.ratingModalVisible);
                }}
                title="Close"
              />
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.quantityModalVisible}
          >
            <View
              style={{
                margin: 50,
                backgroundColor: "#fff"
              }}
            >
              <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: this.state.bigImage }}
              />
              <Text>{this.state.dataSource.name}</Text>

              <TextInput
                placeholder="Enter quantity"
                onChangeText={quantity => this.setState({ quantity: quantity })}
              />

              <Button onPress={() => this.addToCart()} title="Add to cart" />
              <Button
                onPress={() => this.props.navigation.navigate("Cart")}
                title="View cart"
              />
              <Button
                onPress={() =>
                  this.setquantityModalVisible(!this.state.quantityModalVisible)
                }
                title="Close"
              />
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
