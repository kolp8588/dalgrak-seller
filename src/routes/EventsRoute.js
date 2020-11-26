import React from "react";
import { Component } from "react";
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
      <Stack.Navigator>
        <Stack.Screen
          name="Events"
          component={EventsScreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.DALGRAK,
            },
          }}
        />
        <Stack.Screen
          name="EventOption"
          component={EventOptionScreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.DALGRAK,
            },
          }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{
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
