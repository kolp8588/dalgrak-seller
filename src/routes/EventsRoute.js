import React from "react";
import { Component } from "react";
import { TouchableWithoutFeedback} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient';

import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../constants"
import EventsScreen from "../screens/EventsScreen";
import EventOptionScreen from "../screens/EventOptionScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Stack = createStackNavigator();
class EventsRoute extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <Stack.Navigator
        screenOptions={{
          headerBackground: () =>
              <LinearGradient
                colors={['#44C0B0', '#007677']}
                style={{ flex: 1 }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
              />
        }}
      >
        <Stack.Screen
          name="Events"
          component={EventsScreen}
          options={{
            headerTitle: "이벤트",
            headerRight: () => (
              <TouchableWithoutFeedback
              onPress={() => navigation.navigate("EventOption")}
              >
                <MaterialCommunityIcons
                  name={"settings-outline"}
                  size={30}
                  style={{ marginRight: 15, color: "white" }}
                />
              </TouchableWithoutFeedback>
            ),
            headerStyle: {
              backgroundColor: COLORS.DALGRAK,
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="EventOption"
          component={EventOptionScreen}
          options={{
            headerTitle: "알림 설정",
            headerStyle: {
              backgroundColor: COLORS.DALGRAK,
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            headerTitle: "관심 카테고리",
            headerStyle: {
              backgroundColor: COLORS.DALGRAK,
            },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default EventsRoute;
