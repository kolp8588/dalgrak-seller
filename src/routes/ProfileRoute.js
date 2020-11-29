import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SimpleUploadCategoryScreen from "../screens/SimpleUploadCategoryScreen";
import SimpleUploadScreen from "../screens/SimpleUploadScreen";
import { Component } from "react";
import { COLORS } from "../constants";
const Stack = createStackNavigator();

class ProfileRoute extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
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
            headerStyle: {
              backgroundColor: COLORS.DALGRAK,
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="SimpleUpload"
          component={SimpleUploadScreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.DALGRAK,
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="UploadCategory"
          component={SimpleUploadCategoryScreen}
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

export default ProfileRoute;
