import React, { Component } from 'react';
import { Text, View, FlatList, Image, SafeAreaView } from 'react-native';
import R from '../R';
import { Spinner, Card } from '../components';
import api from '../api';

export default class OrderListDetail extends Component {
  constructor() {
    super();
    this.state = {
      access_token: '',
      dataSource: [],
      address: '',
      cost: '',
      isLoading: true
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'OrderID: ' + navigation.getParam('OrderID', '2016')
  });

  componentDidMount() {
    const { navigation } = this.props;
    const order_id = navigation.getParam('OrderID', '2016');
    const method = 'GET';
    const url = `orderDetail?order_id=${order_id}`;
    return api(url, method, null)
      .then(responseJson => {
        if (responseJson.status == 200) {
          this.setState({
            dataSource: responseJson.data.order_details,
            cost: responseJson.data.cost,
            address: responseJson.data.address,
            isLoading: !this.state.isLoading
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state.dataSource);
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
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: R.fonts.GothamBook,
              fontSize: 15,
              paddingVertical: 10,
              paddingLeft: 15
            }}
          >
            Total Amount: Rs. {this.state.cost}
          </Text>
          <Text
            style={{
              fontFamily: R.fonts.GothamMedium,
              fontSize: 15,
              paddingLeft: 15
            }}
          >
            Shipping Address: {this.state.address}
          </Text>

          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
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
                      style={{ height: 80, width: 80 }}
                      source={{ uri: item.prod_image }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      paddingLeft: 10
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: R.fonts.GothamBook,
                        fontSize: 20
                      }}
                    >
                      {item.prod_name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: R.fonts.GothamMedium,
                        fontSize: 15
                      }}
                    >
                      Category: {item.prod_cat_name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: R.fonts.GothamMedium,
                        fontSize: 15
                      }}
                    >
                      Quantity: {item.quantity}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: R.fonts.GothamBook,
                        fontSize: 15,
                        color: R.colors.r2
                      }}
                    >
                      Rs. {item.total}
                    </Text>
                  </View>
                </View>
              </Card>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      );
    }
  }
}
