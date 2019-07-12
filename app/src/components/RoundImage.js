import React from "react";
import { Image, View, StyleSheet } from "react-native";
import R from "../R";

const RoundImage = () => (
  <View style={imgStyle.imageContainer}>
    <Image source={R.images.Background} style={imgStyle.imageStyle} />
  </View>
);
const imgStyle = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    height: 80,
    width: 80,
    padding: 20,
    borderRadius: 40
  }
});

export { RoundImage };
