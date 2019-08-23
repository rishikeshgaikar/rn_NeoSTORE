import React, { Component } from 'react';
import {
  Image,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native';
import { StarRating, Spinner, Card } from '../components';
import R from '../R';
import api from '../api';

export default class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('pcName', 'Table'),
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 20 }}
        onPress={() => navigation.navigate('Cart')}
      >
        <Image source={R.images.Header_cart} />
      </TouchableOpacity>
    )
  });

  componentDidMount() {
    const product_id = this.props.navigation.getParam('pcID', '1');
    const product_category_id = product_id;
    const limit = '10';
    const page = '1';
    const method = 'GET';
    const url = `products/getList?product_category_id=${product_category_id}&limit=${limit}&page=${page}`;
    return api(url, method, null)
      .then(responseJson => {
        if (responseJson.status == 200) {
          this.setState({
            dataSource: responseJson.data,
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
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ItemDetails', {
                    productID: item.id,
                    productName: item.name
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
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        source={{ uri: item.product_images }}
                        style={{ height: 80, width: 80 }}
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
                          fontSize: 20,
                          fontFamily: R.fonts.GothamBold
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          paddingTop: 10,
                          color: R.colors.r2,
                          fontSize: 20,
                          fontFamily: R.fonts.GothamBold
                        }}
                      >
                        Rs. {item.cost}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingTop: 10
                      }}
                    >
                      <StarRating count={item.rating} />
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
