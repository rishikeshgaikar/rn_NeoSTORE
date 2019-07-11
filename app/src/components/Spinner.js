import React from "react";
import { View, ActivityIndicator } from "react-native";

const Spinner = () => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  }
};

export { Spinner };
