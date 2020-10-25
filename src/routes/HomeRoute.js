import React, { Component } from "react";
import { TouchableWithoutFeedback, Image, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import FeedNavigation from "../navigation/FeedNavigation";

import { COLORS } from "../constants";

const Stack = createStackNavigator();
class HomeRoute extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="feed"
          component={FeedNavigation}
          options={{
            headerStyle: {
              backgroundColor: COLORS.DALGRAK,
            },
            headerLeft: () => <View />,
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <TouchableWithoutFeedback
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate("Events")}
              >
                <MaterialCommunityIcons
                  name={"bell"}
                  size={22}
                  style={{ marginRight: 15, color: "white" }}
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
        style={{ width: 70, resizeMode: "contain" }}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
}

export default HomeRoute;
