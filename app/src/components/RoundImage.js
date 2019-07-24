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
    alignItems: "center",
    paddingVertical: 20
  },
  imageStyle: {
    height: 100,
    width: 100,
    padding: 20,
    borderRadius: 100
  }
});

export { RoundImage };
