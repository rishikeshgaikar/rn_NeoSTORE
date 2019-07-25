import React, { Component } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import R from "../R";

class StarRating extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    switch (this.props.count) {
      case 1:
        return (
          <View style={{ flex: 2, flexDirection: "row" }}>
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_unchek}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_unchek}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_unchek}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_unchek}
              style={{ height: 16, width: 16 }}
            />
          </View>
        );
      case 2:
        return (
          <View style={{ flex: 2, flexDirection: "row" }}>
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_unchek}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_unchek}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_unchek}
              style={{ height: 16, width: 16 }}
            />
          </View>
        );
      case 3:
        return (
          <View style={{ flex: 2, flexDirection: "row" }}>
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_unchek}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_unchek}
              style={{ height: 16, width: 16 }}
            />
          </View>
        );
      case 4:
        return (
          <View style={{ flex: 2, flexDirection: "row" }}>
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_unchek}
              style={{ height: 16, width: 16 }}
            />
          </View>
        );
      case 5:
        return (
          <View style={{ flex: 2, flexDirection: "row" }}>
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
            <Image
              source={R.images.star_check}
              style={{ height: 16, width: 16 }}
            />
          </View>
        );
      default:
        return <Text>Rating not available</Text>;
    }
  }
}

export { StarRating };
