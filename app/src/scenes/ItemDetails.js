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
      modalVisible: false
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

    // this.state.productImages.map(test => {
    //   const l = test.image;
    //   console.log(l);
    //   return <Image style={{ width: 30, height: 30 }} source={{ uri: l }} />;
    // });
    // if (this.state.productImages.length > 0) {
    //   const l = this.state.productImages[0].image;
    //   console.log(l);
    //   return <Image style={{ width: 30, height: 30 }} source={{ uri: l }} />;
    // }
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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
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
                  this.setModalVisible(!this.state.modalVisible);
                }}
                title="Rating"
              />
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
