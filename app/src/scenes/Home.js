import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions
} from 'react-native';
import R from '../R';
import { ImageCarousel, Card } from '../components';
import { YellowBox } from 'react-native';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity
        style={{ paddingLeft: 20 }}
        onPress={() => navigation.toggleDrawer()}
      >
        <Image source={R.images.menu_icon} />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 20 }}
        onPress={() => navigation.navigate('Cart')}
      >
        <Image source={R.images.Header_cart} />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      imgSliderData: [
        { key: R.images.slider_img1 },
        { key: R.images.slider_img2 },
        { key: R.images.slider_img3 },
        { key: R.images.slider_img4 }
      ]
    };
  }

  render() {
    YellowBox.ignoreWarnings(['Warning: componentWillUpdate is deprecated']);
    YellowBox.ignoreWarnings(['VirtualizedList: missing keys for items']);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <StatusBar backgroundColor={R.colors.r2} />
          <View style={{ flex: 2 }}>
            <ImageCarousel image={this.state.imgSliderData} />
          </View>

          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                flex: 2,
                flexDirection: 'row'
              }}
            >
              <Card backgroundColor={R.colors.r2}>
                <View style={{ flex: 2, backgroundColor: R.colors.r2 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ProductList', {
                        pcID: '1',
                        pcName: 'Table'
                      })
                    }
                  >
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: dw / 30,
                        paddingVertical: dw / 30
                      }}
                    >
                      <Text
                        style={{
                          paddingBottom: 20,
                          alignSelf: 'flex-end',
                          fontSize: dh / 40,
                          color: R.colors.b1
                        }}
                      >
                        Tables
                      </Text>
                      <Image
                        style={{
                          alignSelf: 'flex-start',
                          width: dw / 4,
                          height: dw / 4
                        }}
                        source={R.images.table}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>

              <Card backgroundColor={R.colors.r2}>
                <View style={{ flex: 2, backgroundColor: R.colors.r2 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ProductList', {
                        pcID: '3',
                        pcName: 'Sofa'
                      })
                    }
                  >
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: dw / 30,
                        paddingVertical: dw / 30
                      }}
                    >
                      <Image
                        style={{
                          alignSelf: 'flex-end',
                          width: dw / 4,
                          height: dw / 4
                        }}
                        source={R.images.sofa}
                      />
                      <Text
                        style={{
                          paddingTop: 20,
                          alignSelf: 'flex-start',
                          fontSize: dh / 40,
                          color: R.colors.b1
                        }}
                      >
                        Sofas
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <Card backgroundColor={R.colors.r2}>
                <View style={{ flex: 2, backgroundColor: R.colors.r2 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ProductList', {
                        pcID: '2',
                        pcName: 'Chiars'
                      })
                    }
                  >
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: dw / 30,
                        paddingVertical: dw / 30
                      }}
                    >
                      <Text
                        style={{
                          paddingBottom: 20,
                          alignSelf: 'flex-start',
                          fontSize: dh / 40,
                          color: R.colors.b1
                        }}
                      >
                        Chairs
                      </Text>
                      <Image
                        style={{
                          alignSelf: 'flex-end',
                          width: dw / 4,
                          height: dw / 4
                        }}
                        source={R.images.chair}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>
              <Card backgroundColor={R.colors.r2}>
                <View style={{ flex: 2, backgroundColor: R.colors.r2 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ProductList', {
                        pcID: '4',
                        pcName: 'Cupboards'
                      })
                    }
                  >
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: dw / 30,
                        paddingVertical: dw / 30
                      }}
                    >
                      <Image
                        style={{
                          alignSelf: 'flex-start',
                          width: dw / 4,
                          height: dw / 4
                        }}
                        source={R.images.cupboard}
                      />
                      <Text
                        style={{
                          paddingTop: 20,
                          alignSelf: 'flex-end',
                          fontSize: dh / 40,
                          color: R.colors.b1
                        }}
                      >
                        Cupboards
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
