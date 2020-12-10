import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Tooltip from "react-native-walkthrough-tooltip";
import CountDown from "react-native-countdown-component";

import Request from "../Request";
import { COLORS, FONTS } from "../../constants";

class DalgrakDetail extends Component {
  state = {
    toolTipVisible: false,
  };
  render() {
    var date = new Date().getTime();
    var endDate = this.props.date;
    var sec = (endDate - date) / 1000;

    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            marginLeft: 10,
            alignItems: "flex-start",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.countDown}>COUNT DOWN</Text>
            <CountDown
              until={sec}
              size={15}
              digitStyle={{ backgroundColor: COLORS.DALGRAK }}
              digitTxtStyle={{ color: "white" }}
              timeToShow={["D", "H", "M", "S"]}
            />
          </View>
        </View>
        <Request {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dalgrak: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
  countDown: {
    fontSize: 20,
    color: COLORS.DALGRAK,
  },
  contents: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    fontSize: FONTS.SIZE.CONTENTS,
    marginVertical: 5,
  },
  request: {
    marginVertical: 5,
    backgroundColor: "lightgray",
    fontSize: FONTS.SIZE.CONTENTS,
    padding: 5,
    height: 120,
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <DalgrakDetail {...props} navigation={navigation} />;
}
