import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Spinner = () => {
  return (
    <View style={spinnerStyle.spinnerStyle}>
      <ActivityIndicator size={"large"} />
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
