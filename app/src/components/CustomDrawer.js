import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { RoundImage } from "../components";
import R from "../R";
import AsyncStorage from "@react-native-community/async-storage";

export default class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      drawerData: [
        { image: R.images.shopping_cart, title: "My Cart", action: "Cart" },
        { image: R.images.tables_icon, title: "Tables", action: "Tables" },
        { image: R.images.sofa_icon, title: "Sofas", action: "Sofas" },
        { image: R.images.chair_icon, title: "Chairs", action: "Chairs" },
        {
          image: R.images.cupboard_icon,
          title: "Cupboards",
          action: "Cupboards"
        },
        {
          image: R.images.username_icon,
          title: "My Account",
          action: "UserProfile"
        },
        {
          image: R.images.myorders_icon,
          title: "My Orders",
          action: "OrderList"
        }
      ]
    };
  }

  async userLogout() {
    try {
      await AsyncStorage.clear();
      {
        this.navigateLogin();
      }
    } catch (e) {
      console.log("Error retrieving data" + e);
    }
    console.log("Done.");
  }

  navigateLogin() {
    this.props.navigation.navigate("SplashScreen");
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: R.colors.b10 }}>
        <RoundImage />
        <View>
          <Text> Username </Text>
          <Text>User email</Text>
        </View>

        <FlatList
          data={this.state.drawerData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(item.action)}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Image source={item.image} />
                </View>
                <View style={{ flex: 5 }}>
                  <Text>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity onPress={() => this.userLogout()}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Image source={R.images.logout_icon} />
            </View>
            <View style={{ flex: 5 }}>
              <Text>Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
