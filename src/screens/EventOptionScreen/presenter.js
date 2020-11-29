import React from "react";
import PropTypes from "prop-types";
import {
  StatusBar,
  Switch,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from "react-native";
import Like from "../../components/Like";
import { COLORS, FONTS } from "../../constants";

const EventOptionScreen = (props) => (
  <View style={styles.container}>
    <View style={styles.contents}>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={styles.itemText}>
          모두 일시 중단
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={props.onChangAlarm}
          value={props.isAlarmStop}
        />
      </View>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={styles.itemText}>
          자정 이후 중단
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={props.onChangAlarmNight}
          value={props.isAlarmStopAtNight}
        />
      </View>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={styles.itemText}>
          관심 카테고리
        </Text>
        <TouchableOpacity
          onPress={() => props.pickCategory()}
          >
          <View
            style={[
              styles.button,
              { backgroundColor: "white" },
              { marginHorizontal: 10 },
              { borderColor: "black" },
              { borderWidth: StyleSheet.hairlineWidth}
            ]}
          >
            <Text style={[styles.text, { color: "black" }]}>
              등록
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text>
        관심 카테고리를 등록하시면 신규 입찰 등록시 알림을 받을 수 있습니다.
      </Text>
      <View style={{flexDirection: "row", margin: 10}}>
        {props.profile.likes &&
        props.profile.likes.map(like => (
          <Like key={like.id} like={like} />
        ))}
      </View>
      <Text style={styles.itemText}>
        달그락 점수
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
  },
  contents: {
    flex: 1,
    margin: 20,
  },
  itemText: {
    fontSize: FONTS.SIZE.CONTENTS,
    fontWeight: "400",
    marginBottom: 20,
  },
  button: {
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
});

EventOptionScreen.propTypes = {
};

export default EventOptionScreen;
