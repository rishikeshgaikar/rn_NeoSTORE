import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import R from "../R";

const RoundButton = props => {
  return (
    <TouchableOpacity style={buttonStyle.buttonBody} onPress={props.onPress}>
      <Text style={buttonStyle.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const buttonStyle = StyleSheet.create({
  buttonBody: {
    margin: 30,
    backgroundColor: R.colors.b1,
    // width: "80%",
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  buttonText: {
    color: R.colors.r2,
    fontSize: 25,
    fontStyle: "normal",
    fontWeight: "bold",
    fontFamily: R.fonts.GothamBold
  }
});

export { RoundButton };
