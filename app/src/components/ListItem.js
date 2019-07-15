import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import StarRating from "./StarRating";

const ListItem = ({ p_image, p_name, p_producer, p_cost, p_rating }) => (
  <TouchableOpacity>
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: p_image }} style={{ height: 50, width: 50 }} />
      </View>
      <View style={{ flex: 4 }}>
        <Text>{p_name}</Text>
        <Text>{p_producer}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 4 }}>
            <Text>Rs. {p_cost}</Text>
          </View>
          <StarRating count={p_rating} />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default ListItem;
