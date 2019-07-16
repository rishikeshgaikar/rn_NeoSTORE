import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import StarRating from "./StarRating";

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: this.props.p_image }}
              style={{ height: 50, width: 50 }}
            />
          </View>
          <View style={{ flex: 4 }}>
            <Text>{this.props.p_name}</Text>
            <Text>{this.props.p_producer}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 4 }}>
                <Text>Rs. {this.props.p_cost}</Text>
              </View>
              <StarRating count={this.props.p_rating} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
