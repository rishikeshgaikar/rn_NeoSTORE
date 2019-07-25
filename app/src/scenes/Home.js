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
import { YellowBox } from "react-native";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgGridDataLink: [
        { key: R.images.tableicon, pcName: "Tables", value: "1" },
        { key: R.images.sofaicon, pcName: "Sofas", value: "3" },
        { key: R.images.chairsicon, pcName: "Chairs", value: "2" },
        { key: R.images.cupboardicon, pcName: "Cupboards", value: "4" }
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
    YellowBox.ignoreWarnings(["Warning: componentWillUpdate is deprecated"]);
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
                key={image.key}
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
                key={item.key}
                style={{ padding: 8 }}
                onPress={() =>
                  this.props.navigation.navigate("ProductList", {
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
