import React, { Component } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignUpBusinessInfoScreen from "../screens/SignUpBusinessInfoScreen";
import SignUpStoreInfoScreen from "../screens/SignUpStoreInfoScreen";

const Stack = createStackNavigator();

class LoggedOutNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
              headerLeft: () => <View />,
            }}
          />
          <Stack.Screen
            name="BusinessInfo"
            component={SignUpBusinessInfoScreen}
            options={{
              headerShown: false,
              headerLeft: () => <View />,
            }}
          />
          <Stack.Screen
            name="StoreInfo"
            component={SignUpStoreInfoScreen}
            options={{
              headerShown: false,
              headerLeft: () => <View />,
            }}
          />
          <Stack.Screen
            name="Listener"
            component={SignUpStoreInfoScreen}
            options={{
              headerShown: false,
              headerLeft: () => <View />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default LoggedOutNavigation;
