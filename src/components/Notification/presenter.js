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
    console.log("Presenter!")
    console.log(this.props.created)
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={{fontSize: FONTS.SIZE.TITLE}}>
            {this.props.title}
          </Text>
          <Text style={{fontSize: FONTS.SIZE.CONTENTS}}>
            {this.props.body}
          </Text>            
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "flex-start"
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
