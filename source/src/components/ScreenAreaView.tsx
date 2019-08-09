import React, { Component } from "react";
import { Platform, StatusBar, StatusBarStyle, StyleSheet } from "react-native";
import {
  NavigationEventSubscription,
  NavigationInjectedProps,
  SafeAreaView,
  withNavigation,
} from "react-navigation";

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

interface IProps extends NavigationInjectedProps {
  forceInset?: any;
  barStyle?: StatusBarStyle;
  style?: {};
}

class ScreenAreaView extends Component<IProps> {
  private didFocusSubscription?: NavigationEventSubscription;

  constructor(props: IProps) {
    super(props);

    this.didFocusSubscription = undefined;
  }

  public componentDidMount(): void {
    StatusBar.setBarStyle(this.props.barStyle || "default", true);

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }

    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      () => {
        StatusBar.setBarStyle(this.props.barStyle || "default", true);
      }
    );
  }

  public componentWillUnmount(): void {
    if (this.didFocusSubscription) {
      this.didFocusSubscription.remove();
    }
  }

  public render(): React.ReactElement<any> {
    return (
      <SafeAreaView
        forceInset={this.props.forceInset}
        style={[styles.screen, this.props.style]}
      >
        <StatusBar animated={true} />
        {this.props.children}
      </SafeAreaView>
    );
  }
}

export default withNavigation(ScreenAreaView);
