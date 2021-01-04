import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FadeIn from "react-native-fade-in-image";
import CountDown from "react-native-countdown-component";
import { COLORS, FONTS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

class Bidding extends Component {
  render() {
    const { navigation } = this.props;
    let bidding = this.props.bidding;
    let dalgrak = bidding.dalgrak;
    let curDate = new Date().getTime();
    let endDate = this.props.bidding.dalgrak.date;
    let sec = (endDate - curDate) / 1000;
  
    return (
      <View style={styles.dalgrak}>
        <TouchableOpacity
         onPress={() => navigation.navigate("related", { bidding: bidding })}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <FadeIn>
              <Image
                source={{ uri: dalgrak.imageUrl }}
                style={{ width: (width - 10) * 0.25, height: (width - 10) * 0.25, borderRadius: 20 }}
              />
            </FadeIn>
            <View
              style={{
                marginLeft: 20,
                marginVertical: 2,
              }}
            >
              <View style={{flexDirection:"row"}}>
                <Text
                  style={{
                    fontSize: FONTS.SIZE.TITLE,
                    fontWeight: "600",
                  }}
                >
                  {dalgrak.category}
                </Text>
                {
                  sec > 0 && bidding.status == "IN_PROGRESS" &&
                  <CountDown
                    style={{marginLeft: 5}}
                    until={sec}
                    size={12}
                    digitTxtStyle={{ color: COLORS.DALGRAK }}
                    digitStyle={{ 
                      borderWidth: 2,
                      borderColor: COLORS.DALGRAK,
                      backgroundColor: "white" 
                    }}
                    timeToShow={['H', 'M', 'S']}
                    showSeparator={true}
                    timeLabels={{h: null, m: null, s: null}}
                  />
                }
              </View>

              <Text
                style={{
                  marginTop: 3,
                  fontSize: FONTS.SIZE.CONTENTS,
                }}
              >
                {dalgrak.quantity} {dalgrak.unit}
              </Text>
              <Text
                style={{
                  fontSize: FONTS.SIZE.CONTENTS,
                }}
              >
                참여업체 : {dalgrak.biddings ? dalgrak.biddings.length : 0}
              </Text>
                {bidding.status == "IN_PROGRESS" && 
                  <Text
                    style={{
                      fontSize: FONTS.SIZE.CONTENTS,
                    }}
                  >진행중
                  </Text>
                }
                {bidding.status == "WAITING_FOR_PAYMENT" && 
                  <Text
                    style={{
                      color: COLORS.SUCCESS,
                      fontSize: FONTS.SIZE.CONTENTS,
                    }}
                  >낙찰
                  </Text>
                }
                {bidding.status == "FAIL" && 
                  <Text
                    style={{
                      color: COLORS.WARNING,
                      fontSize: FONTS.SIZE.CONTENTS,
                    }}
                  >낙찰실패
                  </Text>
                }
                {bidding.status == "ON_SHIPPING" && 
                  <Text
                    style={{
                      color: COLORS.SUCCESS,
                      fontSize: FONTS.SIZE.CONTENTS,
                    }}
                  >배송완료
                  </Text>
                }
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderTopWidth: 0.5,
            borderTopColor: COLORS.MINOR,
            marginVertical: 10,
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dalgrak: {
    marginHorizontal: 30,
  },
});

export default function (props) {
  const navigation = useNavigation();
  return <Bidding {...props} navigation={navigation} />;
}
