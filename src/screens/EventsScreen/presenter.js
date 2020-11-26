import React from "react";
import PropTypes from "prop-types";
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import Notification from "../../components/Notification";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../../constants";

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
      <View style={{alignItems: "flex-end"}}>
      <TouchableOpacity
        onPress={() => props.setEventOption()}
      >
        <MaterialCommunityIcons
          name={"settings-outline"}
          size={30}
          style={{ margin: 15, color: COLORS.DALGRAK }}
        />
      </TouchableOpacity>
    </View>
    {props.notifications.length === 0 && props.notifications.length > 1 ? (
        <Text>
          No notifications yet! Come back soon!
        </Text>
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
