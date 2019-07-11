import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  UserProfile
} from "./app/src/scenes";

const Rootstack = createStackNavigator(
  {
    //first one will be root means first login screen will open
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    },
    ForgotPassword: {
      screen: ForgotPassword
    },
    ResetPassword: {
      screen: ResetPassword
    },
    UserProfile: {
      screen: UserProfile
    }
  },

  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
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
