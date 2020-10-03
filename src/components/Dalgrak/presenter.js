import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FadeIn from "react-native-fade-in-image";
import { COLORS, FONTS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

class DalgrakDetail extends Component {
  render() {
    const { navigation } = this.props;
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
              <Text
                style={{
                  fontSize: FONTS.SIZE.TITLE,
                  color: COLORS.DALGRAK,
                }}
              >
                {this.props.category}
              </Text>
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
                마감일 : {this.props.parseDate(this.props.date)}
              </Text>
              <Text
                style={{
                  fontSize: FONTS.SIZE.CONTENTS,
                }}
              >
                참여업체 : {this.props.participants}
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
