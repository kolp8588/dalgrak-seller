import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Tooltip from "react-native-walkthrough-tooltip";

import { COLORS, FONTS } from "../../constants";

class Request extends Component {
  state = {
    toolTipVisible: false,
  };
  render() {
    var endDate = new Date(this.props.date);
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={styles.profileBox}
            onPressOut={this.props.showAS}
          >
            <Image
              source={require("../../../assets/images/noPhoto.jpg")}
              style={styles.avatar}
              defaultSource={require("../../../assets/images/noPhoto.jpg")}
            />
            <Text
              numberOfLines={1}
              style={{ fontSize: FONTS.SIZE.INFO, width: 200 }}
            >
              {this.props.username}
            </Text>
          </TouchableOpacity>
          <View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name={"heart-outline"}
                size={22}
                style={{ marginRight: 15, color: COLORS.DALGRAK }}
              />
              <MaterialCommunityIcons
                name={"emoticon-devil-outline"}
                size={22}
                style={{ marginRight: 15, color: COLORS.WARNING }}
              />
              <Text
                style={{ fontSize: FONTS.SIZE.INFO, color: COLORS.WARNING }}
              >
                44.4
              </Text>
            </View>
            <Tooltip
              animated={true}
              isVisible={this.state.toolTipVisible}
              contentStyle={{ backgroundColor: COLORS.DALGRAK }}
              content={
                <Text style={{ color: "white", fontSize: FONTS.SIZE.INFO }}>
                  달그락 점수는 판매자로부터 받은 평가, 입찰율, 비매너평가 등을
                  종합해서 만든 신뢰도 점수입니다.
                </Text>
              }
              placement="bottom"
              onClose={() => this.setState({ toolTipVisible: false })}
            >
              <TouchableWithoutFeedback
                onPress={() => this.setState({ toolTipVisible: true })}
              >
                <Text
                  style={{
                    alignSelf: "flex-end",
                    textAlign: "center",
                    textDecorationLine: "underline",
                  }}
                >
                  달그락점수
                </Text>
              </TouchableWithoutFeedback>
            </Tooltip>
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: COLORS.MINOR,
            marginVertical: 10,
          }}
        />
        <Text style={styles.text}>납기 : {endDate.toLocaleString()}</Text>
        <Text style={styles.text}>제품 : {this.props.category}</Text>
        <Text style={styles.text}>
          수량 : {this.props.quantity} {this.props.unit}
        </Text>
        <View style={{flexDirection: "row"}}>
          <Text style={styles.text}>
            배송지 : {this.props.address} {" "}
            {
              this.props.status=="WAITING_FOR_PAYMENT" &&
              this.props.detailAddress
            } 
          </Text>          
        </View>
        
        <Text style={styles.text}>상세 요청 내용 : </Text>
        <Text numberOfLines={5} style={styles.request}>
          {this.props.info}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    fontSize: FONTS.SIZE.CONTENTS,
    marginVertical: 5,
  },
  request: {
    marginVertical: 5,
    backgroundColor: COLORS.DISABLED,
    fontSize: FONTS.SIZE.CONTENTS,
    padding: 5,
    height: 120,
  },
});

export default Request;
