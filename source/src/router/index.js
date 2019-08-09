import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { App } from "./stacks";

const AppNavigator = createSwitchNavigator(
  {
    App,
  },
  {
    initialRouteName: "App",
  }
);

export default createAppContainer(AppNavigator);
