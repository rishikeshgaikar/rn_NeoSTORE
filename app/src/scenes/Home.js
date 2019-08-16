import React, { Component } from 'react';
import {
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Button
} from 'react-native';
import R from '../R';
import { ImageCarousel } from '../components';
import { YellowBox } from 'react-native';

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
      imgGridDataLink: [
        { key: R.images.tableicon, pcName: 'Tables', value: '1' },
        { key: R.images.sofaicon, pcName: 'Sofas', value: '3' },
        { key: R.images.chairsicon, pcName: 'Chairs', value: '2' },
        { key: R.images.cupboardicon, pcName: 'Cupboards', value: '4' }
      ],
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
          <FlatList
            data={this.state.imgGridDataLink}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.key}
                style={{ padding: 8 }}
                onPress={() =>
                  this.props.navigation.navigate('ProductList', {
                    pcID: item.value,
                    pcName: item.pcName
                  })
                }
                // onPress={() => this.props.navigation.toggleDrawer()}
              >
                <Image source={item.key} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </View>
      </View>
    );
  }
}
