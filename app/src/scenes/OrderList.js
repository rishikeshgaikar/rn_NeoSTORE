import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView
} from 'react-native';
import { Card, Spinner, RedButton } from '../components';
import R from '../R';
import api from '../api';

export default class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      access_token: '',
      dataSource: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const method = 'GET';
    const url = 'orderList';
    return api(url, method, null)
      .then(responseJson => {
        if (responseJson.status == 200) {
          this.setState({
            dataSource: responseJson.data.reverse(),
            isLoading: !this.state.isLoading
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
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
    } else if (this.state.dataSource == null) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image source={R.images.empty_orderlist} />
            <Text
              style={{
                fontSize: 20,
                fontFamily: R.fonts.GothamBook,
                padding: 20
              }}
            >
              YOU DONT HAVEN'T PLACE ANY ORDER!!
            </Text>
            <RedButton onPress={() => this.props.navigation.navigate('Home')}>
              Shop Now
            </RedButton>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('OrderListDetail', {
                    OrderID: item.id
                  })
                }
              >
                <Card backgroundColor={R.colors.b2}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <View style={{ flex: 4 }}>
                      <Text
                        style={{
                          fontFamily: R.fonts.GothamBook,
                          paddingBottom: 10,
                          fontSize: 20
                        }}
                      >
                        Order Id: {item.id}
                      </Text>
                      <Text
                        style={{
                          fontFamily: R.fonts.GothamMedium,
                          fontSize: 15
                        }}
                      >
                        Date: {item.created}
                      </Text>
                    </View>
                    <View style={{ flex: 3 }}>
                      <Text
                        style={{
                          alignSelf: 'flex-end',
                          fontFamily: R.fonts.GothamBook,
                          color: R.colors.r2,
                          fontSize: 20,
                          fontWeight: 'bold'
                        }}
                      >
                        Rs {item.cost}
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      );
    }
  }
}
