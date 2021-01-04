import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, FONTS } from "../constants";
import HomeRoute from "../routes/HomeRoute";
import ProfileRoute from "../routes/ProfileRoute";
import { TextInput } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "lightgray",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;

        const iconName = {
          Home: "home-outline",
          Call: "plus-box-outline",
          Profile: "account-circle",
        };

        const title = {
          Home: "홈",
          Call: "달그락등록",
          Profile: "나의달그락",
        };

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === "Call") {
              // navigation.navigate("dalgrakCall");
            } else {
              navigation.setOptions({
                title: label,
              });
              navigation.navigate(label, { name: label });
            }
          }
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <View style={{alignItems: "center"}}>
              <MaterialCommunityIcons
                name={iconName[label]}
                size={30}
                color={isFocused ? COLORS.DALGRAK : "gray"}
                style={{
                }}
              />
              <Text style={{
                  textAlign: "center",
                  fontSize: 12
                }}>
                {title[label]}
              </Text>
            </View>
            
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function TabsNavigation({ navigation, route }) {
  return (
    <Tab.Navigator 
      tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeRoute} />
      <Tab.Screen name="Call" component={View} />
      <Tab.Screen name="Profile" component={ProfileRoute} />
    </Tab.Navigator>
  );
}

export default TabsNavigation;
