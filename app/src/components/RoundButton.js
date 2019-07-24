import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import R from "../R";

const RoundButton = props => {
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
    marginHorizontal: 30,
    marginVertical: 15,
    backgroundColor: R.colors.b1,
    // width: "80%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  buttonText: {
    color: R.colors.r2,
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "bold",
    fontFamily: R.fonts.GothamBold
  }
});

export { RoundButton };
