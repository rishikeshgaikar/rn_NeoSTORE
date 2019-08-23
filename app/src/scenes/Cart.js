import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { RedButton, Card, Spinner } from '../components';
import R from '../R';
import api from '../api';
import CartContext from '../context/CartContext';
import InputSpinner from 'react-native-input-spinner';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      cartCount: '',
      cartTotal: '',
      pickerValue: null,
      isLoading: true
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
        if (responseJson.status == 200) {
          this.setState({
            dataSource: responseJson.data,
            cartCount: responseJson.count,
            cartTotal: responseJson.total,
            isLoading: !this.state.isLoading
          });
        }
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
        if (responseJson.status == 200) {
          this.setState({
            isLoading: !this.state.isLoading
          });
          this.showCart();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteCart(id, cc) {
    const product_id = id;
    const body = `product_id=${product_id}`;
    const method = 'POST';
    const url = 'deleteCart';
    api(url, method, body)
      .then(responseJson => {
        if (responseJson.status == 200) {
          this.setState({
            isLoading: !this.state.isLoading
          });
          this.showCart();
          cc.getUpdate();
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

          this.editCart(itemId, value);
        }}
        onMax={() => {
          alert('Maxximum 8 items are allowed.');
        }}
        onMin={() => {
          alert('Atleast 1 item should be Selected.');
        }}
        style={{
          height: 70,
          width: 130,
          paddingTop: 5
        }}
        buttonStyle={{ height: 36, width: 36 }}
        inputStyle={{
          fontSize: 16,
          fontFamily: R.fonts.GothamBook,
          paddingBottom: 10
        }}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Spinner />
          </View>
        </SafeAreaView>
      );
    } else if (this.state.cartCount > 0) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 9 }}>
            <FlatList
              data={this.state.dataSource}
              extraData={{ value: [this.state.pickerValue] }}
              renderItem={({ item, index }) => (
                <Card backgroundColor={R.colors.b2}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        style={{ width: 80, height: 80 }}
                        source={{ uri: item.product.product_images }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 3,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: 10
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: R.fonts.GothamBook,
                          fontSize: 20,
                          fontWeight: 'bold'
                        }}
                      >
                        {item.product.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: R.fonts.GothamMedium,
                          fontSize: 15
                        }}
                      >
                        Category: {item.product.product_category}
                      </Text>
                      <Text
                        style={{
                          color: R.colors.r2,
                          fontSize: 20,
                          fontFamily: R.fonts.GothamBook,
                          paddingVertical: 10
                        }}
                      >
                        Rs. {item.product.cost}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: R.colors.b3,
                      width: '100%'
                    }}
                  />

                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, height: 40 }}>
                      {this.renderPicker(item.product_id, item.quantity, index)}
                    </View>

                    <View style={{ flex: 2 }}>
                      <CartContext.Consumer>
                        {contextValue => (
                          <TouchableOpacity
                            onPress={() => {
                              this.deleteCart(item.product.id, contextValue);
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Image
                                style={{
                                  height: 50,
                                  width: 50
                                }}
                                source={R.images.delete}
                              />
                              <Text>REMOVE</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      </CartContext.Consumer>
                    </View>
                  </View>
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 30,
              justifyContent: 'space-around'
            }}
          >
            <Text
              style={{
                fontFamily: R.fonts.GothamBook,
                fontSize: 20,
                fontWeight: 'bold'
              }}
            >
              Total Items: {this.state.cartCount}
            </Text>
            <Text
              style={{
                fontFamily: R.fonts.GothamBook,
                fontSize: 20,
                fontWeight: 'bold'
              }}
            >
              Grand Total: Rs. {this.state.cartTotal}
            </Text>
          </View>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <RedButton
              onPress={() => this.props.navigation.navigate('AddressSelection')}
            >
              PROCEED TO CHECKOUT
            </RedButton>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image source={R.images.empty_cart} />
            <Text
              style={{
                fontSize: 20,
                fontFamily: R.fonts.GothamBook,
                padding: 20
              }}
            >
              YOUR CART IS EMPTY!!
            </Text>
            <RedButton onPress={() => this.props.navigation.navigate('Home')}>
              Shop Now
            </RedButton>
          </View>
        </SafeAreaView>
      );
    }
  }
}
