import React from "react";
import { Text, View, StyleSheet } from "react-native";
import R from "../R";

const Heading = props => (
  <View style={headingStyle.bodyStyle}>
    <Text style={headingStyle.textStyle}>{props.children}</Text>
  </View>
);

const headingStyle = StyleSheet.create({
  bodyStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    color: R.colors.b1,
    fontWeight: "bold",
    fontSize: 65,
    fontStyle: "normal",
    fontFamily: R.fonts.GothamBold
  }
});

export { Heading };
