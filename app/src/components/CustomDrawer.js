import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { RoundImage } from '../components';
import R from '../R';
import AsyncStorage from '@react-native-community/async-storage';
import CartCount from './CartCount';
import CartContext from '../context/CartContext';

export default class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      drawerData: [
        {
          image: R.images.shopping_cart_icon,
          title: ' My Cart',
          action: 'Cart',
          cartCount: '1'
        },
        {
          image: R.images.tables_icon,
          title: 'Tables',
          action: 'ProductList',
          value: '1',
          pcName: 'Tables',
          cartCount: '0'
        },
        {
          image: R.images.sofa_icon,
          title: 'Sofas',
          action: 'ProductList',
          value: '3',
          pcName: 'Sofas',
          cartCount: '0'
        },
        {
          image: R.images.chair_icon,
          title: 'Chairs',
          action: 'ProductList',
          value: '2',
          pcName: 'Chairs',
          cartCount: '0'
        },
        {
          image: R.images.cupboard_icon,
          title: 'Cupboards',
          action: 'ProductList',
          value: '4',
          pcName: 'Cupboards',
          cartCount: '0'
        },
        {
          image: R.images.user_icon,
          title: 'My Account',
          action: 'UserProfile',
          cartCount: '0'
        },
        {
          image: R.images.myorders_icon,
          title: 'My Orders',
          action: 'OrderList',
          cartCount: '0'
        },
        {
          image: R.images.logout_icon,
          title: 'Logout',
          action: '',
          cartCount: '0'
        }
      ],
      email: '',
      name: '',
      count: ''
    };
  }

  async userLogout() {
    try {
      await AsyncStorage.clear();
      {
        this.navigateLogin();
      }
    } catch (e) {
      console.log('Error retrieving data' + e);
    }
    console.log('Done.');
  }

  navigateLogin() {
    this.props.navigation.navigate('SplashScreen');
  }

  displayCartCount(cc) {
    if (cc == 1) {
      return (
        <View style={{ flex: 1, paddingTop: 5 }}>
          <CartCount />
        </View>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: R.colors.b10 }}>
        <RoundImage />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CartContext.Consumer>
            {contextValue => {
              return (
                <React.Fragment>
                  <Text
                    style={{
                      color: R.colors.b1,
                      fontFamily: R.fonts.GothamBold,
                      fontSize: 25
                    }}
                  >
                    {contextValue.state.name}
                  </Text>
                  <Text
                    style={{
                      color: R.colors.b1,
                      fontSize: 20,
                      paddingVertical: 5
                    }}
                  >
                    {contextValue.state.email}
                  </Text>
                </React.Fragment>
              );
            }}
          </CartContext.Consumer>
        </View>

        <FlatList
          data={this.state.drawerData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                if (item.title == 'Logout') {
                  this.userLogout();
                }
                this.props.navigation.navigate(item.action, {
                  pcID: item.value,
                  pcName: item.pcName
                });
              }}
            >
              <View style={{ flexDirection: 'row', padding: 20 }}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={item.image}
                    style={{ height: 40, width: 40 }}
                  />
                </View>
                <View style={{ flex: 5 }}>
                  <Text
                    style={{
                      color: R.colors.b1,
                      fontWeight: 'bold',
                      fontSize: 18,
                      fontStyle: 'normal',
                      paddingTop: 10,
                      paddingLeft: 20
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                {this.displayCartCount(item.cartCount)}
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}
