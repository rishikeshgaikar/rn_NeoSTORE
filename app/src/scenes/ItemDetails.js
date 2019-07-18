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

export default class ItemDetails extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      productImages: [],
      bigImage: "",
      modalVisible: false,
      ratedByUser: null
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
    this.setModalVisible(!this.state.modalVisible);
    console.log("userRating: " + this.state.ratedByUser);
    this.userRating();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    console.log(this.state.ratedByUser);
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
            onPress={() => this.setState({ visibleModal: "default" })}
            title="Buy Now"
          />
          <Button
            onPress={() => {
              this.setModalVisible(true);
            }}
            title="Rating"
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
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
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
