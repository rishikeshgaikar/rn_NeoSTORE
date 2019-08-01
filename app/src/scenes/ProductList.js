import React, { Component } from "react";
import { Image, View, FlatList, TouchableOpacity, Text } from "react-native";
import { StarRating } from "../components";
import R from "../R";
import { api } from "../api";

export default class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: []
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("pcName", "Table")
  });

  componentDidMount() {
    const product_id = this.props.navigation.getParam("pcID", "1");
    const product_category_id = product_id;
    const limit = "10";
    const page = "1";
    const method = "GET";
    const url = `products/getList?product_category_id=${product_category_id}&limit=${limit}&page=${page}`;
    return api(url, method, null, null)
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
                this.props.navigation.navigate("ItemDetails", {
                  productID: item.id,
                  productName: item.name
                })
              }
            >
              <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
                <View style={{ flex: 1, paddingLeft: 10, paddingRight: 20 }}>
                  <Image
                    source={{ uri: item.product_images }}
                    style={{ height: 70, width: 70 }}
                  />
                </View>
                <View style={{ flex: 4 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: R.fonts.GothamBold
                    }}
                  >
                    {item.name}
                  </Text>

                  <View
                    style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}
                  >
                    <View style={{ flex: 4 }}>
                      <Text
                        style={{
                          color: R.colors.r2,
                          fontSize: 20,
                          fontFamily: R.fonts.GothamBold
                        }}
                      >
                        Rs. {item.cost}
                      </Text>
                    </View>
                    <StarRating count={item.rating} />
                  </View>
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
