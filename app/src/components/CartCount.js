import React from 'react';
import { Text, View } from 'react-native';
import CartContext from '../context/CartContext';
import R from '../R';

const CartCount = ({ params }) => {
  return (
    <View
      style={{
        backgroundColor: R.colors.b1,
        borderRadius: 20,
        height: 30,
        width: 30
      }}
    >
      <CartContext.Consumer>
        {contextValue => {
          return (
            <Text
              style={{
                fontSize: 20,
                paddingHorizontal: 10,
                paddingTop: 2
              }}
            >
              {contextValue.state.count}
            </Text>
          );
        }}
      </CartContext.Consumer>
    </View>
  );
};

export default CartCount;
