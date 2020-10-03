import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../constants";
import FeedScreen from "../screens/FeedScreen";

const Tab = createMaterialTopTabNavigator();

function TopTabsNavigation({ navigation, route }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MyDalgrak"
        component={FeedScreen}
        options={{
          title: "참여중인 달그락",
        }}
      />
      <Tab.Screen name="Dalgrak"
        component={FeedScreen}
        options={{
          title: "전체 달그락",
        }}
      />
    </Tab.Navigator>
  );
}

export default TopTabsNavigation;
