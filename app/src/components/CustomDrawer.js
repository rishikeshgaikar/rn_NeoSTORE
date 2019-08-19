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
import style from '../Styles';
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
          image: R.images.tables_icon,
          title: 'Tables',
          action: 'ProductList',
          value: '1',
          pcName: 'Tables'
        },
        {
          image: R.images.sofa_icon,
          title: 'Sofas',
          action: 'ProductList',
          value: '3',
          pcName: 'Sofas'
        },
        {
          image: R.images.chair_icon,
          title: 'Chairs',
          action: 'ProductList',
          value: '2',
          pcName: 'Chairs'
        },
        {
          image: R.images.cupboard_icon,
          title: 'Cupboards',
          action: 'ProductList',
          value: '4',
          pcName: 'Cupboards'
        },
        {
          image: R.images.username_icon,
          title: 'My Account',
          action: 'UserProfile'
        },
        {
          image: R.images.myorders_icon,
          title: 'My Orders',
          action: 'OrderList'
        }
      ],
      at: '',
      email: '',
      name: '',
      count: ''
    };
    this.getKey();
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

  async getKey() {
    try {
      const email = await AsyncStorage.getItem('@NeoSTORE_email');
      const fname = await AsyncStorage.getItem('@NeoSTORE_fname');
      const lname = await AsyncStorage.getItem('@NeoSTORE_lname');
      this.setState({ email: email, name: fname + ' ' + lname });
    } catch (error) {
      console.log('Error retrieving data' + error);
    }
  }

  navigateLogin() {
    this.props.navigation.navigate('SplashScreen');
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
                      fontFamily: R.fonts.GothamBold
                    }}
                  >
                    {contextValue.state.email}
                  </Text>
                </React.Fragment>
              );
            }}
          </CartContext.Consumer>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Cart')}
        >
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <View style={{ flex: 1 }}>
              <Image source={R.images.shopping_cart} />
            </View>
            <View style={{ flex: 6 }}>
              <Text style={style.whiteText}>My Cart</Text>
            </View>
            <View style={{ flex: 1 }}>
              <CartCount />
            </View>
          </View>
        </TouchableOpacity>
        <FlatList
          data={this.state.drawerData}
          // style={{ paddingTop: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(item.action, {
                  pcID: item.value,
                  pcName: item.pcName
                })
              }
            >
              <View style={{ flexDirection: 'row', padding: 20 }}>
                <View style={{ flex: 1 }}>
                  <Image source={item.image} />
                </View>
                <View style={{ flex: 5 }}>
                  <Text style={style.whiteText}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity onPress={() => this.userLogout()}>
          <View style={{ flexDirection: 'row', padding: 20 }}>
            <View style={{ flex: 1 }}>
              <Image source={R.images.logout_icon} />
            </View>
            <View style={{ flex: 5 }}>
              <Text style={style.whiteText}>Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
