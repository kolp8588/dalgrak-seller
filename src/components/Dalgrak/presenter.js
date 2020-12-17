import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FadeIn from "react-native-fade-in-image";
import CountDown from "react-native-countdown-component";

import { COLORS, FONTS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

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
          onPress={() => navigation.navigate("dalgrak", { id: this.props.idx })}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <FadeIn>
              <Image
                source={{ uri: this.props.imageUrl }}
                style={{ width: 100, height: 100, borderRadius: 100 }}
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
                    color: COLORS.DALGRAK,
                  }}
                >
                  {this.props.category}
                </Text>
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
              </View>
              <Text
                style={{
                  marginTop: 3,
                  fontSize: FONTS.SIZE.CONTENTS,
                }}
              >
                {this.props.quantity} {this.props.unit}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dalgrak: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <DalgrakDetail {...props} navigation={navigation} />;
}
