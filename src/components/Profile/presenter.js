import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import ProfileNumber from "../ProfileNumber";
import { COLORS, FONTS} from "../../constants"

const width = Dimensions.get("window").width;
class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={"black"}
          titleColor={"black"}
        />
      }
    >
        <View style={styles.header}>
          <View >
          <TouchableOpacity onPressOut={this.props.showAS}>
            <Image
              source={require("../../../assets/images/noPhoto.jpg")}
              style={styles.avatar}
              defaultSource={require("../../../assets/images/noPhoto.jpg")}
            />
          </TouchableOpacity>
          <Text>
            돌깡패
          </Text>
          </View>
          <View style={styles.headerColumn}>
            <View style={styles.profileNumbers}>
              <ProfileNumber
                number={"12"}
                text={"달그락"}
              />
              <ProfileNumber
                number={"25%"}
                text={"입찰율"}
              />
              <ProfileNumber
                number={"33%"}
                text={"낙찰율"}
              />
            </View>
              
          </View>
        </View>
        <View style={styles.contents}>
          <TouchableOpacity>
            <View
              style={[
                styles.button,
                { backgroundColor: "white" },
                { borderColor: "black" },
                { borderWidth: StyleSheet.hairlineWidth}
              ]}
            >
              <Text style={[styles.text, { color: "black" }]}>
                프로필 편집
              </Text>
            </View>
          </TouchableOpacity>
          <View
          style={{
            borderTopWidth: 1,
            borderTopColor: COLORS.MINOR,
            marginVertical: 10,
          }}
        />
          <Text style={styles.headerText}>
            관심 카테고리
          </Text>
          <Text>
            관심 카테고리를 등록하시면 신규 입찰 등록시 알림을 받을 수 있습니다.
          </Text>
          <View
          style={{
            borderTopWidth: 1,
            borderTopColor: COLORS.MINOR,
            marginVertical: 10,
          }}
        />
          <Text style={styles.headerText}>
            상품 간편 등록
          </Text>
          <Text>
            간편 등록 기능을 활용하면 입찰 진행시 빠르게 상품 정보를 입력할 수 있습니다.
          </Text>
          <View
          style={{
            borderTopWidth: 1,
            borderTopColor: COLORS.MINOR,
            marginVertical: 10,
          }}
        />
          <Text style={styles.headerText}>
            구매자 리뷰
          </Text>          
        </View>
        </ScrollView>
      </View>
    );
  }
}
Profile.propTypes = {};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 15,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "space-between",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerColumn: {
    justifyContent: "center",
    width: width * 0.6,
    paddingRight: 30
  },
  profileNumbers: {
    flexDirection: "row",
    marginBottom: 7,
    justifyContent: "space-between",
  },
  contents: {
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: FONTS.SIZE.H1,
    marginBottom: 10,
  },
  name: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 13,
  },
  bio: {
    marginBottom: 5,
  },
  website: {
    color: "#003569",
  },
  modeBar: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "#bbb",
    borderWidth: StyleSheet.hairlineWidth,
  },
  modeIcon: {
    width: width / 2,
    alignItems: "center",
  },
  button: {
    borderRadius: 3,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  photoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Profile;
