import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import api from '../api';
import CartContext from './CartContext.js';

export default class CartProvider extends Component {
  constructor() {
    super();
    this.state = {
      count: null,
      email: null,
      name: null
    };
    this.getUpdate();
    this.getCount();
  }

  getCount() {
    const method = 'GET';
    const url = 'users/getUserData';
    return api(url, method, null)
      .then(responseJson => {
        this.setState({
          count: responseJson.data.total_carts
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

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

  getUpdate = () => {
    const method = 'GET';
    const url = 'users/getUserData';
    return api(url, method, null)
      .then(responseJson => {
        this.setState({
          email: responseJson.data.user_data.email,
          name:
            '' +
            responseJson.data.user_data.first_name +
            ' ' +
            responseJson.data.user_data.last_name
        });
        console.log('AD');
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          state: this.state,
          onPlus: this.PlusCount,
          onMinus: this.MinusCount,
          getUpdate: this.getUpdate
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
