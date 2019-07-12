import React, { Component } from "react";
import { View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  UserProfile,
  EditProfile
} from "./app/src/scenes";
import R from "./app/src/R";

const Rootstack = createStackNavigator(
  {
    //first one will be root means first login screen will open
    // Login: {
    //   screen: Login,
    //   navigationOptions: {
    //     header: null
    //   }
    // },
    // Register: {
    //   screen: Register,
    //   navigationOptions: {
    //     title: "REGISTER"
    //   }
    // },
    // ForgotPassword: {
    //   screen: ForgotPassword,
    //   navigationOptions: {
    //     title: "FOEGOT PASSWORD"
    //   }
    // },
    // ResetPassword: {
    //   screen: ResetPassword,
    //   navigationOptions: {
    //     title: "RESET PASSWORD"
    //   }
    // },
    // UserProfile: {
    //   screen: UserProfile,
    //   navigationOptions: {
    //     title: "MY ACCOUNT"
    //   }
    // },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: "EDIT PROFILE"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: R.colors.r2
      },
      headerTintColor: R.colors.b1,
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: <View />
    }
  }

  // {
  //   headerMode: "none",
  //   navigationOptions: {
  //     headerVisible: false
  //   }
  // }
);

const HomeStack = createStackNavigator({
  //first one will be root means first login screen will open
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
});

const RootContainer = createAppContainer(Rootstack);
const HomeContainer = createAppContainer(HomeStack);

export { RootContainer, HomeContainer };
