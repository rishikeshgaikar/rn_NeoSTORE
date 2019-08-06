import React from "react";
import { View, Image } from "react-native";
import R from "../R";

const StarRating = ({ count }) => {
  var elements = [];
  for (i = 0; i < count; i++) {
    elements.push(
      <Image source={R.images.star_check} style={{ height: 16, width: 16 }} />
    );
  }

  for (j = count; j < 5; j++) {
    elements.push(
      <Image source={R.images.star_unchek} style={{ height: 16, width: 16 }} />
    );
  }

  return elements.map(item => {
    return <View>{item}</View>;
  });
};
export { StarRating };
