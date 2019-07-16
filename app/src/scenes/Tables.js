import React, { Component } from "react";
import { Image, View, FlatList } from "react-native";
import ListItem from "../components/ListItem";

export default class Tables extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    const product_category_id = "1";
    const limit = "10";
    const page = "1";
    const fetchConfig = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    return fetch(
      `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${product_category_id}&limit=${limit}&page=${page}`,
      fetchConfig
    )
      .then(response => response.json())
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
            <View>
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate("ItemDetails", {
                    productID: item.id,
                    productName: item.name
                  })
                }
                p_image={item.product_images}
                p_name={item.name}
                p_producer={item.producer}
                p_cost={item.cost}
                p_rating={item.rating}
              />
            </View>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}
