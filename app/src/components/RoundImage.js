import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import R from '../R';
import CartContext from '../context/CartContext';

class RoundImage extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {test => {
          if (test.state.profile_pic == '') {
            return (
              <View style={imgStyle.imageContainer}>
                <Image
                  source={R.images.Background}
                  style={imgStyle.imageStyle}
                />
              </View>
            );
          } else {
            return (
              <View style={imgStyle.imageContainer}>
                <Image
                  source={{ uri: test.state.profile_pic }}
                  style={imgStyle.imageStyle}
                />
              </View>
            );
          }
        }}
      </CartContext.Consumer>
    );
  }
}
const imgStyle = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  imageStyle: {
    height: 100,
    width: 100,
    padding: 20,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: R.colors.b1
  }
});

export { RoundImage };
