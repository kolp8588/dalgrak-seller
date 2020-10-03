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
import Dalgrak from "../../components/Dalgrak";
import { COLORS } from "../../constants";

const FeedScreen = (props) => (
  <ScrollView
    style={{ flex: 1, backgroundColor: "white" }}
    refreshControl={
      <RefreshControl
        refreshing={props.isFetching}
        onRefresh={props.refresh}
        tintColor={"black"}
      />
    }>
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {props.feed &&
          props.feed.map((dalgrak, index) => {
            dalgrak.idx = index;
            return <Dalgrak {...dalgrak} key={dalgrak.id} />;
          })}
      </View>
    </ScrollView>
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {props.feed &&
          props.feed.map((dalgrak, index) => {
            dalgrak.idx = index;
            return <Dalgrak {...dalgrak} key={dalgrak.id} />;
          })}
      </View>
    </ScrollView>
  </ScrollView>


);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
    //marginHorizontal: 20,
  },
});

FeedScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  feed: PropTypes.array,
};

export default FeedScreen;
