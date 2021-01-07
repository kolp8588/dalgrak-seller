import React, { Component } from "react";
import { TouchableWithoutFeedback, Image, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import FeedNavigation from "../navigation/FeedNavigation";
import {LinearGradient} from 'expo-linear-gradient';

import { COLORS } from "../constants";

const Stack = createStackNavigator();

class HomeRoute extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "white",
          headerHideShadow: true,
        }}
      >
        <Stack.Screen
          name="feed"
          component={FeedNavigation}
          options={{
            headerStyle: {
              elevation: 0,
              backgroundColor: COLORS.DALGRAK
            },
            headerBackground: () =>
              <LinearGradient
                colors={[COLORS.DALGRAK, COLORS.DALGRAK_MEDIUM, COLORS.DALGRAK_DARK]}
                style={{ flex: 1 }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
              />,
            headerLeft: () => <View />,
            headerTitle: () => <LogoTitle />,
            headerRight: () => (
              <TouchableWithoutFeedback
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate("Events")}
              >
                <MaterialCommunityIcons
                  name={"bell-outline"}
                  size={25}
                  style={{ marginRight: 15, color: 'white' }}
                />
              </TouchableWithoutFeedback>
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

function LogoTitle() {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 40, height: 40, resizeMode: "contain"}}
        source={require("../../assets/images/dalgrak_white.png")}
      />
    </View>
  );
}

export default HomeRoute;
