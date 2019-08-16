import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import CartContext from './CartContext.js';

export default class CartProvider extends Component {
  state = {
    count: 0
  };
  PlusCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  MinusCount = () => {
    this.setState({
      count: this.state.count - 1
    });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          state: this.state,
          onPlus: this.PlusCount,
          onMinus: this.MinusCount
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
