import React from "react";
import { Text, View, Image } from "react-native";

const ListItem = ({ p_image, p_name, p_producer, p_cost, p_rating }) => (
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
        <View style={{ flex: 2 }}>
          <Text>{p_rating}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default ListItem;
