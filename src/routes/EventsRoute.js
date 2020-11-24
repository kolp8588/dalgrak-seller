import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../constants"
import EventsScreen from "../screens/EventsScreen";

const Stack = createStackNavigator();
function EventsRoute() {
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
    </Stack.Navigator>
  );
}

export default EventsRoute;
