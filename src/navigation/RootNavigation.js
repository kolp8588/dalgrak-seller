import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient';
import TabsNavigation from "./TabsNavigation";
import EventsRoute from "../routes/EventsRoute";
import DalgrakScreen from "../screens/DalgrakScreen";
import RelatedDalgrakScreen from "../screens/RelatedDalgrakScreen";
import BiddingScreen from "../screens/BiddingScreen";
import SuccessfulBiddingScreen from "../screens/SuccessfulBiddingScreen";
import CallScreen from "../screens/CallScreen";
import CallSettingsScreen from "../screens/CallSettingsScreen";
import { COLORS } from "../constants";
const Stack = createStackNavigator();

class RootNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator mode="modal"
        screenOptions={{
          headerBackground: () =>
              <LinearGradient
                colors={[COLORS.DALGRAK, COLORS.DALGRAK_MEDIUM, COLORS.DALGRAK_DARK]}
                style={{ flex: 1 }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
              />,
          headerTintColor: "white",
        }}
        >
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
              headerTitle: "주문서",
            }}
          />
          <Stack.Screen
            name="related"
            component={RelatedDalgrakScreen}
            options={{
              headerTitle: "나의 입찰서",
            }}
          />
          <Stack.Screen
            name="successful"
            component={SuccessfulBiddingScreen}
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
              headerTitle: "입찰하기",
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
