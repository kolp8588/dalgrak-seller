import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TabsNavigation from "./TabsNavigation";
import EventsRoute from "../routes/EventsRoute";
import DalgrakScreen from "../screens/DalgrakScreen";
import RelatedDalgrakScreen from "../screens/RelatedDalgrakScreen";
import BiddingScreen from "../screens/BiddingScreen";
import CallScreen from "../screens/CallScreen";
import CallSettingsScreen from "../screens/CallSettingsScreen";
import { COLORS } from "../constants";
const Stack = createStackNavigator();

class RootNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator mode="modal">
          <Stack.Screen
            name="Tabs"
            component={TabsNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="dalgrak"
            component={DalgrakScreen}
            options={{
              headerTitle: false,
              headerBackTitleVisible: false,
              headerTintColor: "black",
            }}
          />
          <Stack.Screen
            name="related"
            component={RelatedDalgrakScreen}
            options={{
              headerTitle: false,
              headerBackTitleVisible: false,
              headerTintColor: "black",
            }}
          />
          <Stack.Screen
            name="bidding"
            component={BiddingScreen}
            options={{
              headerTitle: false,
              headerBackTitleVisible: false,
              headerTintColor: "black",
            }}
          />
          <Stack.Screen
            name="dalgrakCall"
            component={CallScreen}
            options={{
              // headerShown: false,
              headerTitle: false,
              headerBackTitleVisible: false,
              // headerLeft: () => <View />,
              headerRight: () => (
                <TouchableWithoutFeedback
                // onPress={() => navigation.navigate("Events")}
                >
                  <MaterialCommunityIcons
                    name={"settings-outline"}
                    size={30}
                    style={{ marginRight: 15, color: COLORS.DALGRAK }}
                  />
                </TouchableWithoutFeedback>
              ),
            }}
          />
          <Stack.Screen
            name="callSettings"
            component={CallSettingsScreen}
            options={{
              headerTitle: false,
              headerBackTitleVisible: false,
            }}
          />
          {/* <Stack.Screen
            name="biddingResult"
            component={BiddingResultScreen}
            options={{
              headerTitle: false,
              headerBackTitleVisible: false,
              headerTintColor: "black",
            }}
          /> */}
          <Stack.Screen name="Events" 
            component={EventsRoute} 
            options={{
              headerShown: false,
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default RootNavigation;
