import React, { Component } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";

export default class ItemDetails extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      productImages: [],
      bigImage: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("productName", "default product")
  });

  componentDidMount() {
    const { navigation } = this.props;
    const product_id = navigation.getParam("productID", "4");

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
            style={{ width: 200, height: 200 }}
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

  render() {
    console.log(this.state.dataSource);
    console.log(this.state.productImages);
    return (
      <View>
        {this.renderBigImage()}
        <Text>{this.state.dataSource.name}</Text>
        <Text>{this.state.dataSource.cost}</Text>
        <Text>{this.state.dataSource.description}</Text>
        <Text>{this.state.dataSource.producer}</Text>
        <Text>{this.state.dataSource.rating}</Text>
        <ScrollView
          horizontal
          pagingEnabled
          snapToAlignment={"center"}
          showsHorizontalScrollIndicator={true}
        >
          {this.renderImages()}
        </ScrollView>
      </View>
    );
  }
}
