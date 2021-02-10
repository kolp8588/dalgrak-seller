import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

class Notification extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={{fontSize: FONTS.SIZE.TITLE}}>
            {this.props.title}
          </Text>
          <Text style={{fontSize: FONTS.SIZE.CONTENTS, color: COLORS.GRAY_LINE}}>
            {this.props.body}
          </Text>            
        </TouchableOpacity>
        <View
          style={{
            borderTopColor: "lightgray",
            borderTopWidth: 1,
            marginTop: 25,
            width: width - 30,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "flex-start"
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <Notification {...props} navigation={navigation} />;
}
