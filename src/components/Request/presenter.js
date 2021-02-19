import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Tooltip from "react-native-walkthrough-tooltip";
import Moment from 'moment';

import { COLORS, FONTS } from "../../constants";

const { width, height } = Dimensions.get("window");
class Request extends Component {
  state = {
    toolTipVisible: false,
  };
  render() {
    console.log("profile")
    console.log(this.props)
    var endDate = new Date(this.props.date);
    return (
      <View style={styles.container}>        
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <View style={{ flexDirection: "row", alignItems: "center"}}>
            <TouchableOpacity
              style={styles.profileBox}
              onPressOut={() => this.props.navigation.navigate("profile")}
            >
              <View>            
                <Image
                  source={require("../../../assets/images/noPhoto.jpg")}
                  style={styles.avatar}
                  defaultSource={require("../../../assets/images/noPhoto.jpg")}
                />             
              </View>
            </TouchableOpacity>
            <Text style={{ fontSize: FONTS.SIZE.TITLE, fontWeight: "bold", textAlignVertical: "center"}}>
              {this.props.username} 님의 주문서
            </Text>
          </View>          
          <View>
            <View style={{ flexDirection: "row" }}>              
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
              <TouchableOpacity
                onPress={() => this.setState({ toolTipVisible: true })}
              >
                <View>
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      textAlign: "center",
                      textDecorationLine: "underline",
                    }}
                  >
                    달그락점수
                  </Text>
                 </View>
              </TouchableOpacity>
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
        <View style={{flexDirection: "row"}}>
          <View style={styles.titleArea}>
            <Text style={styles.titleText}>납</Text>
            <Text style={styles.titleText}>기</Text>
            <Text style={styles.titleText}>일</Text>
          </View>
          
          <Text style={styles.text}>{Moment(endDate).format('YYYY년 MM월 DD일 HH시 mm분')}</Text>
        </View>

        <View style={{flexDirection: "row"}}>
          <View style={styles.titleArea}>
            <Text style={styles.titleText}>제</Text>
            <Text style={styles.titleText}>품</Text>
          </View>
          <Text style={styles.text}>{this.props.category}</Text>
        </View>
        
        <View style={{flexDirection: "row"}}>
          <View style={styles.titleArea}>
            <Text style={styles.titleText}>수</Text>
            <Text style={styles.titleText}>량</Text>
          </View>
          <Text style={styles.text}>
            {this.props.quantity} {this.props.unit}
          </Text>
        </View>
        
        <View style={{flexDirection: "row"}}>
          <View style={styles.titleArea}>
            <Text style={styles.titleText}>배</Text>
            <Text style={styles.titleText}>송</Text>
            <Text style={styles.titleText}>지</Text>
          </View>
          <View>
            <Text style={styles.text}>
              {this.props.address} {" "}
              {
                this.props.status=="WAITING_FOR_PAYMENT" &&
                this.props.detailAddress
              } 
            </Text>
            {
              this.props.status!="WAITING_FOR_PAYMENT" &&
              <Text style={styles.addressInfoText}>* 상세주소는 입찰 성공 시 표시됩니다.</Text>
            } 
          </View>
          
        </View>
        
        <Text style={styles.titleText}>상세 요청</Text>
        <Text numberOfLines={5} style={styles.request}>
          {this.props.info}
        </Text>
        {
          this.props.isBidding==undefined && (
            <TouchableOpacity 
              style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}
              onPressOut={this.props.submit}>
              <MaterialCommunityIcons            
                name={ this.props.isInterest ? "heart" : "heart-outline"}
                size={22}
                style={{ marginRight: 3, color: COLORS.DALGRAK }}
              />
              <Text
                style={{ fontSize: FONTS.SIZE.CONTENTS, textAlignVertical: "center" }}
              >
                관심 달그락
              </Text>
            </TouchableOpacity>

          )
        }
        
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
  titleArea: {
    flexDirection: "row",
    width: width * 0.16, 
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: FONTS.SIZE.H1,
    textAlignVertical: "center",
    fontWeight: "900",
    marginVertical: 5,
  },
  text: {
    fontSize: FONTS.SIZE.CONTENTS,
    textAlignVertical: "center",
    marginVertical: 5,
    marginLeft: 20,
  },
  addressInfoText: {
    fontSize: FONTS.SIZE.INFO,
    color: COLORS.DALGRAK,
    textAlignVertical: "center",
    marginLeft: 20,
  },
  request: {
    marginVertical: 5,
    backgroundColor: COLORS.INPUT,
    fontSize: FONTS.SIZE.CONTENTS,
    padding: 5,
    height: height * 0.18,
    borderRadius: 5,
  },
});

export default function (props) {
  const navigation = useNavigation();
  return <Request {...props} navigation={navigation} />;
}