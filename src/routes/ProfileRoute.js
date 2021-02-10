import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SimpleUploadCategoryScreen from "../screens/SimpleUploadCategoryScreen";
import SimpleUploadScreen from "../screens/SimpleUploadScreen";
import { Component } from "react";
import {LinearGradient} from 'expo-linear-gradient';

import { COLORS } from "../constants";
const Stack = createStackNavigator();

class ProfileRoute extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Stack.Navigator
        screenOptions={{
          headerBackground: () =>
              <LinearGradient
                colors={[COLORS.DALGRAK, COLORS.DALGRAK_MEDIUM, COLORS.DALGRAK_DARK]}
                style={{ flex: 1 }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
              />
        }}
        >
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerStyle: {
              backgroundColor: COLORS.DALGRAK,
            },
            headerTitle: "나의 달그락",
            headerTintColor: "white",            
          }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEditScreen}
          options={{
            headerTitle: "프로필 편집",
            headerTintColor: "white",     
            // headerRight: () => (
            //   <TouchableOpacity
            //     style={{ marginRight: 20 }}
            //     // onPress={() => navigation.navigate("Events")}
            //   >
            //     <Text style={{
            //       color:"white",
            //     }}>저장</Text>
            //   </TouchableOpacity>
            // ),
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
        <Stack.Screen
          name="SimpleUpload"
          component={SimpleUploadScreen}
          options={{
            headerTitle: "간편등록",
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
            headerTitle: "간편등록",
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
