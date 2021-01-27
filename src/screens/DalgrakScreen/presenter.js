import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import FadeIn from "react-native-fade-in-image";
import CountDown from "react-native-countdown-component";

import DalgrakDetail from "../../components/DalgrakDetail";
import { COLORS, COMMON_STYLES, FONTS } from "../../constants";

const { height, width } = Dimensions.get("window");

const DargrakScreen = (props) => {
  let dalgrak;
  for (let item of props.feed) {
    if ( props.route.params.id == item.id) {
      dalgrak = item;
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <DalgrakDetail {...dalgrak} />
      </View>
      <View
        style={{
          height: 50,
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={[styles.button, { flex: 1, backgroundColor: COLORS.DALGRAK }]}
          onPress={() =>
            props.navigation.navigate("bidding", { dalgrak: dalgrak })
          }
        >
          <Text style={styles.buttonText}>입찰하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: FONTS.SIZE.CONTENTS,
  },
});

DargrakScreen.propTypes = {};

export default DargrakScreen;
