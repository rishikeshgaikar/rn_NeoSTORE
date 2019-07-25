import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import R from "../R";

const RedButton = props => {
  return (
    <TouchableOpacity
      style={buttonStyle.buttonBody}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={buttonStyle.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const buttonStyle = StyleSheet.create({
  buttonBody: {
    margin: 5,
    backgroundColor: R.colors.r2,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  buttonText: {
    color: R.colors.b1,
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "bold",
    fontFamily: R.fonts.GothamBold
  }
});

export { RedButton };
