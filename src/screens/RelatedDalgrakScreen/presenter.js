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
import DalgrakDetail from "../../components/DalgrakDetail";

import { COLORS, COMMON_STYLES, FONTS } from "../../constants";

const { height, width } = Dimensions.get("window");

const RelatedDalgrakScreen = (props) => {
  var bidding = props.route.params.bidding;
  var dalgrak = bidding.dalgrak;
  
  return (
    <ScrollView style={styles.container}>
      <DalgrakDetail {...dalgrak} />
      <View style={{marginHorizontal: 15}}>
      <View
          style={{
            borderTopWidth: 1,
            borderTopColor: COLORS.MINOR,
            marginVertical: 10,
          }}
        />
        <Text style={{fontSize: FONTS.SIZE.H1, color: COLORS.DALGRAK, marginBottom: 10}}>
          내 입찰 내역
        </Text>
        <Text style={styles.contents}>
          입찰단가 : {bidding.price} 원 / {dalgrak.unit}
        </Text>
        <Text style={styles.contents}>
          배송비 : 0 원
        </Text>
        <Text style={styles.contents}>
          총 입찰 금액 : {bidding.total} 원
        </Text>
        <Text style={styles.contents}>
          코멘트 : {bidding.comment}
        </Text>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: COLORS.MINOR,
            marginVertical: 10,
          }}
        />
        <Text style={{fontSize: FONTS.SIZE.H1, color: COLORS.DALGRAK, marginBottom: 10}}>
          참여 업체
        </Text>
        <Text style={styles.contents}>
          0 개
        </Text>
      </View>
      <View
        style={{
          height: 50,
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={[styles.button, { flex: 1, backgroundColor: COLORS.WARNING }]}
        >
          <Text style={styles.buttonText}>입찰 취소</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contents:{
    marginVertical:5,
    fontSize: FONTS.SIZE.CONTENTS
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

RelatedDalgrakScreen.propTypes = {};

export default RelatedDalgrakScreen;
