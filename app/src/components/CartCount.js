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
                fontSize: 18,
                paddingHorizontal: 10,
                paddingVertical: 3
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
