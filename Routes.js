import React, { Component } from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
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
  OrderListDetail,
  SplashScreen
} from "./app/src/scenes";
import R from "./app/src/R";
import CustomDrawer from "./app/src/components/CustomDrawer";

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
const MainStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "NeoSTORE"
      }
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        title: "MY CART"
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
    OrderList: {
      screen: OrderList,
      navigationOptions: {
        title: "OLD ORDERS"
      }
    },

    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        title: "MY ACCOUNT"
      }
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        title: "RESET PASSWORD"
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: "EDIT PROFILE"
      }
    },
    OrderListDetail: {
      screen: OrderListDetail
    },
    AddressSelection: {
      screen: AddressSelection,
      navigationOptions: {
        title: "SELECT ADRESS"
      }
    },
    ItemDetails: {
      screen: ItemDetails
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
    Main: {
      screen: MainStack
    }
  },
  {
    drawerType: "slide",
    contentComponent: CustomDrawer
  }
);

const SplashStack = createSwitchNavigator(
  {
    SplashScreen: {
      screen: SplashScreen
    },
    loginFlow: {
      screen: Entrystack
    },
    homeFlow: {
      screen: DrawerStack
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const EntryContainer = createAppContainer(Entrystack);
const DrawerContainer = createAppContainer(DrawerStack);
const SplashContainer = createAppContainer(SplashStack);

export { EntryContainer, DrawerContainer, SplashContainer };

// const RootContainer = createAppContainer(Entrystack);
// export { RootContainer };
