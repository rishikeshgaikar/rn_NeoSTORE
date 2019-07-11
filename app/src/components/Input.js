import React from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import R from "../R";
const Input = ({ image, placeholder, placeholderColor }) => (
  <View style={inputStyle.c}>
    <View style={inputStyle.c1}>
      <Image source={image} />
    </View>
    <View style={inputStyle.c2}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        style={inputStyle.textinput}
      />
    </View>
  </View>
);

const inputStyle = StyleSheet.create({
  textinput: {
    color: R.colors.b1,
    fontSize: 30,
    fontStyle: "normal",
    fontFamily: R.fonts.GothamBold
  },
  c: {
    marginTop: 10,
    marginHorizontal: 30,
    flexDirection: "row",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: R.colors.b1
  },
  c1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  c2: {
    flex: 5
  }
});

export { Input };
