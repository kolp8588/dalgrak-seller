import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Tooltip from 'react-native-walkthrough-tooltip';
import CountDown from "react-native-countdown-component";
import PropTypes from "prop-types";
import FadeIn from "react-native-fade-in-image";

import { COLORS, FONTS } from "../../constants";

class DalgrakDetail extends Component {
  state = {
    toolTipVisible: false,
  };
  render() {
    var date = new Date().getTime();
    var endDate = new Date(this.props.date);
    var sec = (endDate.getTime() - date) / 1000;

    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
        }}>
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
              timeToShow={['D', 'H', 'M', 'S']}
            />
          </View>
        </View>
        <View style={styles.contents}>
          <Text style={{ fontSize: FONTS.SIZE.TITLE }}>달그락 제목이 필요할까</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={styles.profileBox}
              onPressOut={this.props.showAS}>
              <Image
                source={require("../../../assets/images/noPhoto.jpg")}
                style={styles.avatar}
                defaultSource={require("../../../assets/images/noPhoto.jpg")}
              />
              <Text
                numberOfLines={1}
                style={{ fontSize: FONTS.SIZE.INFO, width: 100 }}>
                {this.props.userId}
              </Text>
            </TouchableOpacity>
            <View>
              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name={"emoticon-devil-outline"}
                  size={22}
                  style={{ marginRight: 15, color: COLORS.WARNING }}
                />
                <Text style={{ fontSize: FONTS.SIZE.INFO, color: COLORS.WARNING }}>44.4</Text>
              </View>


              <Text style={{ textDecorationLine: 'underline' }}>달그락점수</Text>
              <Tooltip
                isVisible={this.state.toolTipVisible}
                content={<Text>Check this out!</Text>}
                placement="top"
                onClose={() => this.setState({ toolTipVisible: false })}
              >
                <TouchableHighlight style={styles.touchable}
                  onPressOut={() => this.setState({ toolTipVisible: true })}>
                  <Text>Press me!!</Text>
                </TouchableHighlight>
              </Tooltip>

            </View>

          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.MINOR,
            }}
          />
          <Text style={styles.text}>납기 : {endDate.toLocaleString()}</Text>
        </View>
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
    color: COLORS.DALGRAK
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
  }
});

export default function (props) {
  const navigation = useNavigation();

  return <DalgrakDetail {...props} navigation={navigation} />;
}
