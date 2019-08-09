import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from "react-native-animatable";
import {
  createBottomTabNavigator,
} from "react-navigation";
import { icons } from '../../assets/images';
import { colors } from '../../constants/theme';
import {
  AccountScreen,
  HomeScreen,
  SettingScreen
} from "../../screens";

const AnimationImage = (props: any) => (
    <View style={{ alignItems: 'center' }}>
      <Image
        animation={props.focused ? "pulse" : undefined}
        source={props.icon}
        resizeMode="contain"

        style={[styles.icon, { tintColor: props.tintColor || "" }]}
      />
      <Text style={{
        color: props.focused ? '#000000' : props.tintColor || undefined,
        fontSize: 10,
        marginTop: 8,
      }}>{props.title}</Text>
    </View>
  );

export const Main = createBottomTabNavigator(
  {
    AccountScreenTab: {
      screen: AccountScreen
    },

    HomeScreenTab: {
      screen: HomeScreen
    },

    SettingScreenTab: {
      screen: SettingScreen
    },
    // TestStrategyTab: {
    //   navigationOptions: () => ({
    //     title: "Test strategy"
    //   }),
    //   screen: TestStategy
    // },
  }, {
    defaultNavigationOptions: ({
      navigation
    }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case "AccountScreenTab":
            return (
              <AnimationImage
                focused={navigation.isFocused()}
                icon={icons.calendarOutline}
                tintColor={tintColor}
                title='Account'
              />
            );
          case "HomeScreenTab":
            return (
              <AnimationImage
                focused={navigation.isFocused()}
                icon={icons.recommend}
                tintColor={tintColor}
                title='Home'
              />
            );
          case "SettingScreenTab":
            return (
              <AnimationImage
                focused={navigation.isFocused()}
                icon={icons.analytics}
                tintColor={tintColor}
                title='Setting'
              />
            );
          default:
            return null;
        }
      }
    }),
    initialRouteName: "HomeScreenTab",
    lazy: true,
    tabBarOptions: {
      activeTintColor: colors.main,
      inactiveTintColor: "rgba(55, 55, 55, 0.5)",
      labelStyle: {
        fontSize: 10,
        fontWeight: "normal"
      },
      showLabel: false,
      style: {
        backgroundColor: "#ffffff",
        elevation: 3,
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: {
          height: -10,
          width: 0
        },
        shadowOpacity: 1,
        shadowRadius: 24
      },
    }
  }
);


const styles = StyleSheet.create({
  icon: {
    height: 15,
    width: 15
  }
});