import React from 'react';
import { Text, View } from 'react-native';
import CartContext from '../context/CartContext';

const CartCount = ({ params }) => {
  return (
    <View>
      <CartContext.Consumer>
        {contextValue => {
          return (
            <Text style={{ fontSize: 20 }}>{contextValue.state.count}</Text>
          );
        }}
      </CartContext.Consumer>
    </View>
  );
};

export default CartCount;
