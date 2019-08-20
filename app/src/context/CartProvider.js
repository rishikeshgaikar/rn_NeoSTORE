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
  }
  getUpdate = () => {
    const method = 'GET';
    const url = 'users/getUserData';
    return api(url, method, null)
      .then(responseJson => {
        if (responseJson.status == 200) {
          console.log(responseJson.data.total_carts);
          this.setState({
            count: responseJson.data.total_carts,
            email: responseJson.data.user_data.email,
            name:
              '' +
              responseJson.data.user_data.first_name +
              ' ' +
              responseJson.data.user_data.last_name
          });
          console.log('test' + this.state.count);
        }
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
          onPlus: this.getUpdate,
          onMinus: this.getUpdate,
          getUpdate: this.getUpdate
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
