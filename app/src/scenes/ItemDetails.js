import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { RedButton, Rating, StarRating, Spinner, Card } from '../components';
import R from '../R';
import api from '../api';
import InputSpinner from 'react-native-input-spinner';
import CartContext from '../context/CartContext';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

export default class ItemDetails extends Component {
  constructor() {
    super();
    this.state = {
      access_token: '',
      dataSource: [],
      productImages: [],
      bigImage: '',
      ratingModalVisible: false,
      quantityModalVisible: false,
      ratedByUser: null,
      quantity: '1',
      isLoading: ''
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('productName', 'Center Coffee Table'),
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
    const { navigation } = this.props;
    const product_id = navigation.getParam('productID', '1');
    const method = 'GET';
    const url = `products/getDetail?product_id=${product_id}`;
    return api(url, method, null)
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.data,
            productImages: responseJson.data.product_images,
            bigImage: responseJson.data.product_images[0].image
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderImages() {
    return this.state.productImages.map(test => {
      return (
        <TouchableOpacity
          onPress={() => this.setState({ bigImage: test.image })}
          key={test.image}
          style={{ margin: 15 }}
        >
          <Image
            style={{
              width: dw / 5,
              height: dw / 5,
              borderColor: R.colors.r2,
              borderWidth: 1
            }}
            source={{ uri: test.image }}
          />
        </TouchableOpacity>
      );
    });
  }

  renderBigImage() {
    if (this.state.bigImage.length > 0) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15
          }}
        >
          <Image
            style={{ width: dw / 2, height: dw / 2 }}
            source={{ uri: this.state.bigImage }}
          />
        </View>
      );
    }
  }

  ratebuttonClick() {
    this.setratingModalVisible(!this.state.ratingModalVisible);
    console.log('userRating: ' + this.state.ratedByUser);
    this.userRating();
  }

  bnbuttonClick(cc) {
    this.setquantityModalVisible(!this.state.quantityModalVisible);
    this.addToCart(cc);
  }

  setratingModalVisible(visible) {
    this.setState({ ratingModalVisible: visible });
  }
  setquantityModalVisible(visible) {
    this.setState({ quantityModalVisible: visible });
  }

  myCallback = rating => {
    this.setState({ ratedByUser: rating });
  };

  userRating() {
    const { navigation } = this.props;
    const user_rating = this.state.ratedByUser;
    const product_id = navigation.getParam('productID', '1');
    const method = 'POST';
    const body = `product_id=${product_id}&rating=${user_rating}`;
    const url = 'products/setRating';
    return api(url, method, body)
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  addToCart(cc) {
    const { navigation } = this.props;
    const quantity = this.state.quantity;
    console.log(this.state.quantity);
    const product_id = navigation.getParam('productID', '1');
    const method = 'POST';
    const body = `product_id=${product_id}&quantity=${quantity}`;
    const url = 'addToCart';
    return api(url, method, body)
      .then(responseJson => {
        cc.getUpdate();
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    var self = this;
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
          <View style={{ flex: 10 }}>
            <ScrollView nestedScrollEnabled>
              <Card backgroundColor={R.colors.b2}>
                <View style={{ padding: 15 }}>
                  <Text
                    style={{ fontFamily: R.fonts.GothamBook, fontSize: 20 }}
                  >
                    {this.state.dataSource.name}
                  </Text>
                  <Text
                    style={{ fontFamily: R.fonts.GothamMedium, fontSize: 15 }}
                  >
                    {this.state.dataSource.producer}
                  </Text>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 5 }}>
                      <Text
                        style={{
                          color: R.colors.r2,
                          fontSize: 20,
                          fontFamily: R.fonts.GothamBook
                        }}
                      >
                        Rs. {this.state.dataSource.cost}
                      </Text>
                    </View>
                    <StarRating count={this.state.dataSource.rating} />
                  </View>
                  {this.renderBigImage()}
                  <ScrollView
                    nestedScrollEnabled
                    horizontal
                    pagingEnabled
                    snapToAlignment={'center'}
                    showsHorizontalScrollIndicator={true}
                  >
                    {this.renderImages()}
                  </ScrollView>
                  <Text
                    style={{
                      fontFamily: R.fonts.GothamBook,
                      fontSize: 20,
                      paddingVertical: 10
                    }}
                  >
                    Description:
                  </Text>
                  <Text
                    style={{ fontFamily: R.fonts.GothamMedium, fontSize: 15 }}
                  >
                    {this.state.dataSource.description}
                  </Text>
                </View>
              </Card>
            </ScrollView>
          </View>
          <View
            style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 10 }}
          >
            <View style={{ flex: 1 }}>
              <RedButton
                onPress={() => {
                  this.setquantityModalVisible(true);
                }}
              >
                BUY NOW
              </RedButton>
            </View>
            <View style={{ flex: 1 }}>
              <RedButton
                onPress={() => {
                  this.setratingModalVisible(true);
                }}
              >
                RATE
              </RedButton>
            </View>
            <Modal
              animationType='slide'
              transparent={true}
              visible={this.state.ratingModalVisible}
            >
              <View style={{ flex: 1 }}>
                <View
                  opacity={0.5}
                  style={{ flex: 5, backgroundColor: '#000' }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setratingModalVisible(!this.state.ratingModalVisible)
                    }
                    style={{ flex: 1 }}
                  />
                </View>
                <View
                  style={{
                    // flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    height: 400
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: R.fonts.GothamBook,
                      padding: 20
                    }}
                  >
                    {this.state.dataSource.name}
                  </Text>
                  <Image
                    style={{ width: 200, height: 200, marginBottom: 20 }}
                    source={{ uri: this.state.bigImage }}
                  />
                  <Rating
                    callbackFromParent={this.myCallback}
                    rating={1}
                    max={5}
                    iconWidth={24}
                    iconHeight={24}
                    iconSelected={R.images.star_check}
                    iconUnselected={R.images.star_unchek}
                    onRate={rating => this.setState({ rating: rating })}
                  />
                  <View style={{ width: '80%' }}>
                    <RedButton
                      onPress={() => {
                        this.ratebuttonClick();
                      }}
                    >
                      RATE
                    </RedButton>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal
              animationType='slide'
              transparent={true}
              visible={this.state.quantityModalVisible}
            >
              <View style={{ flex: 1 }}>
                <View
                  opacity={0.5}
                  style={{ flex: 5, backgroundColor: '#000' }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setquantityModalVisible(
                        !this.state.quantityModalVisible
                      )
                    }
                    style={{ flex: 1 }}
                  />
                </View>
                <View
                  style={{
                    // flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    height: 440
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: R.fonts.GothamBook,
                      padding: 20
                    }}
                  >
                    {this.state.dataSource.name}
                  </Text>
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={{ uri: this.state.bigImage }}
                  />
                  <InputSpinner
                    max={8}
                    min={1}
                    step={1}
                    value={this.state.quantity}
                    onChange={quantity => this.setState({ quantity: quantity })}
                    onMax={() => {
                      alert('Maxximum 8 items are allowed.');
                    }}
                    onMin={() => {
                      alert('Atleast 1 item should be Selected.');
                    }}
                    style={{ paddingVertical: 20 }}
                  />
                  <View style={{ width: '80%' }}>
                    <CartContext.Consumer>
                      {contextValue => (
                        <RedButton
                          onPress={() => {
                            this.bnbuttonClick(contextValue);
                          }}
                        >
                          ADD TO CART
                        </RedButton>
                      )}
                    </CartContext.Consumer>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      );
    }
  }
}
