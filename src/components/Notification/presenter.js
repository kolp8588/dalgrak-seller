import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

class Notification extends Component {
  render() {
    const { navigation } = this.props;
    console.log(this.props)
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text>
              Test1
            </Text>
            <Text>
              Test2
            </Text>
          </View>
          <Text>
              Test3
          </Text>            
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center"
  },
  dalgrak: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <Notification {...props} navigation={navigation} />;
}
