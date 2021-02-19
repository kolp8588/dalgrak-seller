import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Image
} from "react-native";
import Dalgrak from "../../components/Dalgrak";
import { COLORS, FONTS } from "../../constants";

const { height, width } = Dimensions.get("window");

const cur = new Date().getTime();
const FeedScreen = (props) => (
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
      {
        props.feed && props.feed.filter((dalgrak) => {
          return dalgrak.date > cur;
        }).length > 0 ? (
        props.feed.filter((dalgrak) => {
          return dalgrak.date > cur;
        })
        .map((dalgrak, index) => {
          dalgrak.idx = index;
          return <Dalgrak {...dalgrak} key={dalgrak.id} />;
        })) : (
          <View style={{flex: 1, height: height * 0.6, alignItems: "center", justifyContent: "center"}}>
            <Image 
              style={{ width: 50, height: 50, resizeMode: "stretch"}}
              source={require("../../../assets/images/dalgrak_logo.png")}
            />
            <Text
              style={{ marginTop: 40, fontSize: FONTS.SIZE.TITLE, color: COLORS.MINOR, fontWeight: "bold"}}
            >
              등록 된 달그락이 없습니다.
            </Text>
          </View>
          )
        }
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

FeedScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  feed: PropTypes.array,
};

export default FeedScreen;
