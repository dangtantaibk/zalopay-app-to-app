// @ts-ignore
import LottieView from "lottie-react-native";
// @ts-ignore
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { loading } from "../assets/json";

const styles = StyleSheet.create({
  loading: {
    height: 300,
    width: 300
  },
  wrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

interface IProps {
  style?: {};
}

export default class Loading extends Component<IProps> {
  public render(): React.ReactElement<any> {
    return (
      <View style={[styles.wrapper, this.props.style]}>
        <LottieView
          source={loading.loadingAnimation}
          style={styles.loading}
          loop
          autoPlay
        />
      </View>
    );
  }
}
