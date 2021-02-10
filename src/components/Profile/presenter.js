import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import ProfileNumber from "../ProfileNumber";
import Like from "../Like";
import Add from "../Add";
import SimpleUpload from "../SimpleUpload";
import { useNavigation } from "@react-navigation/native";

import { COLORS, FONTS } from "../../constants"

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
          refreshing={this.props.isFetching}
          onRefresh={this.props.refresh}
        />
      }
    >
        <View style={styles.header}>
          <TouchableOpacity onPressOut={() => this.props.navigation.navigate("ProfileEdit")}>
            <ImageBackground
              source={require("../../../assets/images/noPhoto.jpg")}
              style={styles.avatar}
              imageStyle={{borderRadius: 50}}
              defaultSource={require("../../../assets/images/noPhoto.jpg")}
            >
            </ImageBackground>
          </TouchableOpacity>
          <Text style={{fontSize: FONTS.SIZE.H1, fontWeight: "bold", marginBottom: 10}}>
            {this.props.profile.userInfo.username}
          </Text>
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
          <View style={{flexDirection: "row", flexWrap:'wrap', marginVertical: 10,}}>
            {this.props.profile.likes &&
            this.props.profile.likes.map(like => (
              <Like key={like.id} like={like} />
            ))}
            <Add onAddPress={this.props.pickCategory}/>
          </View>
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
          <View style={{flexDirection: "row", flexWrap:'wrap', marginVertical: 10,}}>
            {this.props.profile.simpleUploads &&
            this.props.profile.simpleUploads.map(simpleUpload => (
              <SimpleUpload key={simpleUpload.category.id} simpleUpload={simpleUpload} />
            ))}
            <Add onAddPress={this.props.addSimpleUpload}/>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: COLORS.MINOR,
              marginVertical: 10,
            }}
          />
            <TouchableOpacity
              // onPressOut={() => this.props.navigation.navigate("Notification")}
              >
              <View>
                <Text style={styles.headerText}>
                  공지사항
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
            <TouchableOpacity
              // onPressOut={() => this.props.navigation.navigate("FAQ")}
              >
              <View>
                <Text style={styles.headerText}>
                  고객센터
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
            <TouchableOpacity
              // onPressOut={() => this.props.navigation.navigate("Delivery")}
              >
              <View>
              <Text style={styles.headerText}>
                  배송관리
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
            <TouchableOpacity
              // onPressOut={() => this.props.navigation.navigate("Events")}
              >
              <View>
                <Text style={styles.headerText}>
                  이벤트
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
            <TouchableOpacity onPressOut={this.props.showAS}>
              <View>
                <Text style={styles.headerText}>
                  로그아웃
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
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "flex-end"
    
  },
  headerColumn: {
    justifyContent: "center",
    width: width * 0.5,
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
  profieButton: {
    borderRadius: 3,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
    borderColor: "black" ,
    borderWidth: StyleSheet.hairlineWidth
  },
  button: {
    borderRadius: 3,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth
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

export default function (props) {
  const navigation = useNavigation();
  return <Profile {...props} navigation={navigation} />;
}
