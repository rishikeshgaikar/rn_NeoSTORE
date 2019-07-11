import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import R from "../R";

const RoundButton = props => {
  return (
    <TouchableOpacity style={ButtonStyles.buttonBody}>
      <Text style={ButtonStyles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const ButtonStyles = StyleSheet.create({
  buttonBody: {
    backgroundColor: R.colors.r1,
    width: "75%",
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  buttonText: {
    color: R.colors.b10,
    fontSize: 20,
    fontStyle: "normal",
    fontFamily: R.fonts.GothamBold
  }
});

export { RoundButton };
