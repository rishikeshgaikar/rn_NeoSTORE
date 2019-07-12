import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import R from "../R";

const Spinner = () => {
  return (
    <View style={spinnerStyle.spinnerStyle}>
      <ActivityIndicator size={"large"} color={R.colors.b1} />
    </View>
  );
};

const spinnerStyle = StyleSheet.create({
  spinnerStyle: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});

export { Spinner };
