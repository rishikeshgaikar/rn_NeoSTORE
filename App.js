import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { RoundButton, Spinner } from './app/src/components';
import { SplashContainer } from './Routes';

import CartProvider from './app/src/context/CartProvider';
export default class App extends Component {
  render() {
    return (
      <CartProvider>
        <SplashContainer />
      </CartProvider>
    );
  }
}
