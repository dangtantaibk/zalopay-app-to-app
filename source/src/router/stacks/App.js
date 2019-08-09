import { createStackNavigator } from "react-navigation";
import {HomeScreen} from "../../screens";
import AccountScreen from "../../screens/containers/AccountScreen";
import {Main} from "../tabs/Main";

export const App =
    createStackNavigator({
      Main,
      HomeScreen,
      AccountScreen
    }, {
      headerMode: "none",
      initialRouteName: 'Main',
      navigationOptions: {
        swipeEnabled: false
      }
});
