import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, FONTS } from "../constants";
import FeedScreen from "../screens/FeedScreen";
import BiddingFeedScreen from "../screens/BiddingFeedScreen";
import InterestsFeedScreen from "../screens/InterestsFeedScreen";

const Tab = createMaterialTopTabNavigator();

function TopTabsNavigation({ navigation, route }) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: FONTS.SIZE.CONTENTS,
          fontWeight: "bold"
        },
        indicatorStyle: {
          backgroundColor: COLORS.DALGRAK,
         },
      }}>
      <Tab.Screen
        name="Biddings"
        component={BiddingFeedScreen}
        options={{
          title: "참여 달그락",
        }}
      />
      <Tab.Screen
        name="LikeDalgrak"
        component={InterestsFeedScreen}
        test={{a:1,b:2}}
        options={{
          title: "관심 달그락",
        }}
      />
      <Tab.Screen
        name="Dalgrak"        
        component={FeedScreen}
        options={{
          title: "전체 달그락",
        }}
      />
    </Tab.Navigator>
  );
}

export default TopTabsNavigation;
