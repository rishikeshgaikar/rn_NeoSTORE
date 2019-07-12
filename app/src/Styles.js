import { StyleSheet } from "react-native";
import R from "./R";

const style = StyleSheet.create({
  redContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: R.colors.r2
  },
  whiteText: {
    color: R.colors.b1,
    fontWeight: "bold",
    fontSize: 16,
    fontStyle: "normal",
    fontFamily: R.fonts.GothamBold
  },
  login_c1: {
    flex: 10,
    justifyContent: "center"
  },
  login_c2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default style;
