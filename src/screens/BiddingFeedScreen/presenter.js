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
import Bidding from "../../components/Bidding";
import { COLORS } from "../../constants";

const BiddingFeedScreen = (props) => (
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
      {props.biddings &&
        props.biddings.map((bidding, index) => {
          bidding.idx = index;
          return <Bidding bidding={bidding} key={bidding.id} />;
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

BiddingFeedScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  biddings: PropTypes.array,
};

export default BiddingFeedScreen;
