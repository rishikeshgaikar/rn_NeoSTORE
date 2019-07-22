import React, { Component } from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  UserProfile,
  EditProfile,
  Home,
  Tables,
  Sofas,
  Chairs,
  Cupboards,
  ItemDetails,
  Cart,
  AddressSelection,
  OrderList,
  OrderListDetail
} from "./app/src/scenes";
import R from "./app/src/R";

const Entrystack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        title: "REGISTER"
      }
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        title: "FOEGOT PASSWORD"
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
);
const DrawerStack = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "NeoSTORE"
      }
    },
    Tables: {
      screen: Tables,
      navigationOptions: {
        title: "TABLES"
      }
    },
    Sofas: {
      screen: Sofas,
      navigationOptions: {
        title: "SOFAS"
      }
    },
    Chairs: {
      screen: Chairs,
      navigationOptions: {
        title: "CHAIRS"
      }
    },
    Cupboards: {
      screen: Cupboards,
      navigationOptions: {
        title: "CUPBOARDS"
      }
    },
    ItemDetails: {
      screen: ItemDetails
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        title: "MY CART"
      }
    },
    AddressSelection: {
      screen: AddressSelection,
      navigationOptions: {
        title: "SELECT ADRESS"
      }
    },
    OrderList: {
      screen: OrderList,
      navigationOptions: {
        title: "OLD ORDERS"
      }
    },
    OrderListDetail: {
      screen: OrderListDetail
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        title: "RESET PASSWORD"
      }
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        title: "MY ACCOUNT"
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: "EDIT PROFILE"
      }
    }
  },
  // {
  //   defaultNavigationOptions: {
  //     headerStyle: {
  //       backgroundColor: R.colors.r2
  //     },
  //     headerTintColor: R.colors.b1,
  //     headerTitleStyle: {
  //       fontWeight: "bold",
  //       textAlign: "center",
  //       alignSelf: "center"
  //     },
  //     headerRight: <View />
  //   }
  // },
  {
    drawerType: "slide"
  }
);

const OtherStack = createStackNavigator();

const EntryContainer = createAppContainer(Entrystack);
const DrawerContainer = createAppContainer(DrawerStack);
const OtherContainer = createAppContainer(OtherStack);

const Rootstack = createStackNavigator(
  {
    Entry: {
      screen: EntryContainer
    },
    Main: {
      screen: DrawerContainer
    },
    other: {
      screen: OtherContainer
    }
  },
  {
    initialRouteName: "Main"
  }
);

const RootContainer = createAppContainer(DrawerStack);
export { RootContainer };
