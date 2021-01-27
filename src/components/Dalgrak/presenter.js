import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FadeIn from "react-native-fade-in-image";
import CountDown from "react-native-countdown-component";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, FONTS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { color } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

class DalgrakDetail extends Component {
  render() {
    const { navigation } = this.props;

    let date = new Date().getTime();
    let endDate = this.props.date;
    let sec = (endDate - date) / 1000;
    return (
      <View style={styles.dalgrak}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("dalgrak", { id: this.props.id })}
          }
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <FadeIn>
              <Image
                source={{ uri: this.props.imageUrl }}
                style={{ width: (width - 10) * 0.25, height: (width - 10) * 0.25, borderRadius: 20 }}
              />
            </FadeIn>
            <View
              style={{
                flex: 1,
                marginLeft: 20,
                marginVertical: 2,
              }}
            >
              <View style={{
                  flexDirection:"row", 
                  justifyContent: "space-between",
                  alignContent: "space-between"
                }}>
                <Text
                  style={{                    
                    fontSize: FONTS.SIZE.TITLE,
                    textAlignVertical: "center"
                  }}
                >
                  {this.props.category}
                </Text>
                {
                  sec > 0 &&                
                  <View style={{flexDirection: "row"}}>
                    <MaterialCommunityIcons
                      style={{alignSelf: "center"}}
                      name={"timer"}
                      size={22}
                    />
                    <CountDown
                      until={sec}
                      size={FONTS.SIZE.CONTENTS}
                      digitStyle={{ 
                        width: 25
                      }}
                      timeToShow={['H', 'M', 'S']}
                      showSeparator={true}
                      timeLabels={{h: null, m: null, s: null}}
                    />
                  </View>
                }
                {
                  sec < 0 && 
                  <Text
                    style={{                    
                      fontSize: FONTS.SIZE.TITLE,
                      color: COLORS.MINOR,
                      textAlignVertical: "center"
                    }}
                  >종료</Text>
                }
              </View>
              <Text
                style={{
                  marginTop: 3,
                  fontSize: FONTS.SIZE.CONTENTS,
                }}
              >
                수량 : {this.props.quantity} {this.props.unit}
              </Text>
              
              <Text
                style={{
                  fontSize: FONTS.SIZE.CONTENTS,
                }}
              >
                참여업체 : {this.props.biddings ? this.props.biddings.length : 0}
              </Text>              
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
    marginHorizontal: 20,
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <DalgrakDetail {...props} navigation={navigation} />;
}
