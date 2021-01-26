import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from "react-native";
import Notification from "../../components/Notification";

import { COLORS, FONTS } from "../../constants";
const { height, width } = Dimensions.get("window");

const EventsScreen = (props) => (
  <ScrollView
    style={{ flex: 1, backgroundColor: "white" }}
    refreshControl={
      <RefreshControl
        refreshing={props.isFetching}
        onRefresh={props.refresh}
        tintColor={"black"}
      />
    }
  >
    <View style={styles.container}>
      {props.notifications.length === 0 ? (
        <View style={{flex: 1, height: height * 0.6, alignItems: "center", justifyContent: "center"}}>
          <Image 
            style={{ width: 50, height: 50, resizeMode: "stretch"}}
            source={require("../../../assets/images/dalgrak_logo.png")}
          />
          <Text
            style={{ marginTop: 40, fontSize: FONTS.SIZE.TITLE, color: COLORS.MINOR, fontWeight: "bold"}}
          >
            최근 이벤트가 없습니다.
          </Text>
        </View>
      ) : (
        props.notifications.map(notification => (
          <Notification key={notification.id} {...notification} />
        ))
      )}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "flex-start",
    backgroundColor: "white",
    //marginHorizontal: 20,
  },
});

EventsScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  feed: PropTypes.array,
};

export default EventsScreen;
