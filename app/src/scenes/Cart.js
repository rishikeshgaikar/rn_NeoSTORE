import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Picker
} from 'react-native';
import R from '../R';
import { RedButton } from '../components';
import api from '../api';
import InputSpinner from 'react-native-input-spinner';
import CartContext from '../context/CartContext';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      access_token: '',
      dataSource: [],
      cartCount: '',
      cartTotal: '',
      pickerValue: null
    };
  }

  componentDidMount() {
    this.showCart();
  }

  showCart() {
    const url = 'cart';
    const method = 'GET';
    return api(url, method, null)
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.data,
            cartCount: responseJson.count,
            cartTotal: responseJson.total
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  editCart(id, quant) {
    const product_id = id;
    const quantity = quant;
    const body = `product_id=${product_id}&quantity=${quantity}`;
    const method = 'POST';
    const url = 'editCart';
    api(url, method, body)
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status == 200) {
          console.log(responseJson.status);
          this.showCart();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteCart(id) {
    const product_id = id;
    const body = `product_id=${product_id}`;
    const method = 'POST';
    const url = 'deleteCart';
    api(url, method, body)
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status == 200) {
          console.log(responseJson.status);
          this.showCart();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderPicker(itemId, itemQuant, iVal) {
    return (
      <InputSpinner
        max={8}
        min={1}
        step={1}
        value={
          this.state['pickValue' + iVal] == null
            ? itemQuant
            : this.state['pickValue' + iVal]
        }
        onChange={value => {
          this.setState({ ['pickValue' + iVal]: value });
          console.log('selected value' + value);
          console.log('itemid:' + itemId);
          this.editCart(itemId, value);
        }}
        onMax={() => {
          alert('Maxximum 8 items are allowed.');
        }}
        onMin={() => {
          alert('Atleast 1 item should be Selected.');
        }}
        style={{ height: 80, width: 130, paddingTop: 10 }}
        buttonStyle={{ height: 40, width: 40 }}
        inputStyle={{ fontSize: 18, fontFamily: R.fonts.GothamBook }}
      />
    );
  }

  render() {
    if (this.state.cartCount > 0) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 9 }}>
            <FlatList
              data={this.state.dataSource}
              extraData={{ value: [this.state.pickerValue] }}
              renderItem={({ item, index }) => (
                <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                  <View style={{ flex: 1, padding: 30 }}>
                    <Image
                      style={{ width: 75, height: 75 }}
                      source={{ uri: item.product.product_images }}
                    />
                  </View>
                  <View style={{ flex: 4 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 4 }}>
                        <Text
                          style={{
                            fontFamily: R.fonts.GothamBook,
                            fontSize: 20,
                            fontWeight: 'bold'
                          }}
                        >
                          {item.product.name}
                        </Text>
                        <Text style={{ fontStyle: 'italic' }}>
                          Category: {item.product.product_category}
                        </Text>
                      </View>
                      <View style={{ flex: 2 }}>
                        <CartContext.Consumer>
                          {contextValue => (
                            <TouchableOpacity
                              onPress={() => {
                                this.deleteCart(item.product.id);
                                contextValue.onMinus();
                              }}
                            >
                              <Image
                                style={{
                                  height: 60,
                                  width: 60,
                                  paddingTop: 40
                                }}
                                source={R.images.delete}
                              />
                            </TouchableOpacity>
                          )}
                        </CartContext.Consumer>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 4 }}>
                        {this.renderPicker(
                          item.product_id,
                          item.quantity,
                          index
                        )}
                      </View>
                      <View style={{ flex: 3 }}>
                        <Text
                          style={{
                            color: R.colors.r2,
                            fontSize: 20,
                            fontFamily: R.fonts.GothamBook,
                            fontWeight: 'bold',
                            paddingTop: 10
                          }}
                        >
                          Rs. {item.product.cost}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: 20, flexDirection: 'row' }}>
            <View style={{ flex: 4, paddingLeft: 20 }}>
              <Text
                style={{
                  fontFamily: R.fonts.GothamBook,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
              >
                Total items:
              </Text>
              <Text
                style={{
                  fontFamily: R.fonts.GothamBook,
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
              >
                Grand Total:
              </Text>
            </View>
            <View style={{ flex: 2, paddingLeft: 20 }}>
              <Text
                style={{
                  fontFamily: R.fonts.GothamBook,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: R.colors.r2
                }}
              >
                {this.state.cartCount}
              </Text>
              <Text
                style={{
                  fontFamily: R.fonts.GothamBook,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: R.colors.r2
                }}
              >
                Rs. {this.state.cartTotal}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <RedButton
              onPress={() => this.props.navigation.navigate('AddressSelection')}
            >
              ORDER NOW
            </RedButton>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image source={R.images.empty_cart} />
          <Text
            style={{
              fontSize: 20,
              fontFamily: R.fonts.GothamBook,
              paddingTop: 20
            }}
          >
            YOUR CART IS EMPTY!!
          </Text>
        </View>
      );
    }
  }
}
