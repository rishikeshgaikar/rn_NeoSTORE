import React, { Component } from "react";
import {
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Text
} from "react-native";
import R from "../R";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgGridDataLink: [
        { key: R.images.tableicon, action: "Tables", value: "1" },
        { key: R.images.sofaicon, action: "Sofas", value: "2" },
        { key: R.images.chairsicon, action: "Chairs", value: "3" },
        { key: R.images.cupboardicon, action: "Cupboards", value: "4" }
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
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <StatusBar backgroundColor={R.colors.r2} />
        <View style={{ flex: 2 }}>
          <ScrollView
            horizontal
            pagingEnabled
            snapToAlignment={"center"}
            showsHorizontalScrollIndicator={true}
          >
            {this.state.imgSliderData.map(image => (
              <Image
                style={{ width: 393, height: "100%" }}
                source={image.key}
              />
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <FlatList
            data={this.state.imgGridDataLink}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ padding: 8 }}
                // onPress={() => this.props.navigation.navigate(item.action)}
                onPress={() => this.props.navigation.toggleDrawer()}
              >
                <Image source={item.key} />
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        </View>
      </View>
    );
  }
}
