import React from "react";
import PropTypes from "prop-types";
import {
  Switch,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from "react-native";
import Like from "../../components/Like";
import Add from "../../components/Add";
import { COLORS, FONTS } from "../../constants";

const EventOptionScreen = (props) => (
  <View style={styles.container}>
    <View style={styles.contents}>
      <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 20}}>
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
      <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 20}}>
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
      <Text style={styles.itemText}>
        관심 카테고리
      </Text>
      <Text>
        관심 카테고리를 등록하시면 신규 입찰 등록시 알림을 받을 수 있습니다.
      </Text>
      <View style={{flexDirection: "row", flexWrap: "wrap", marginVertical: 10}}>
        {props.profile.likes &&
        props.profile.likes.map(like => (
          <Like key={like.id} like={like} />
        ))}
        <Add onAddPress={props.pickCategory}/>
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
    margin: 10,
  },
  itemText: {
    fontSize: FONTS.SIZE.H1,
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
    fontSize: FONTS.SIZE.CONTENTS,
    textAlign: "center",
  },
});

EventOptionScreen.propTypes = {
};

export default EventOptionScreen;
