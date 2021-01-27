import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import Dalgrak from "../../components/Dalgrak";
import { COLORS } from "../../constants";

const InterestsFeedScreen = (props) => (
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
      {props.interests &&
        props.interests.map((dalgrak, index) => {
          dalgrak.idx = index;
          return <Dalgrak {...dalgrak} key={dalgrak.id} />;
        })}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
    paddingTop: 10,
  },
});

InterestsFeedScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  feed: PropTypes.array,
};

export default InterestsFeedScreen;
