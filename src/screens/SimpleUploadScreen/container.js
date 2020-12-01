import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "../../components/Profile";
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { COLORS, COMMON_STYLES, FONTS } from "../../constants";
import FadeIn from "react-native-fade-in-image";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
    };
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.setState({
      category: this.props.route.params.category,
    });
  }

  render() {
    const { user, profile } = this.props;
    const { category } = this.state;
    return (
      <View style={styles.container}>
        {category && (
          <View style={COMMON_STYLES.FLEX_START}>
          <ScrollView
            style={{
              flex: 1,
              alignSelf: "stretch",
            }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                marginTop: 50,
                marginLeft: 20,
                fontSize: FONTS.SIZE.TITLE,
              }}
            >
              {category.name}
            </Text>
            <FadeIn>
              <Image
                source={{ uri: category.imageUrl }}
                style={{
                  width: 200,
                  height: 200,
                  marginTop: 40,
                  borderRadius: 100,
                }}
              />
            </FadeIn>
            <Text
              style={{
                alignSelf: "flex-start",
                marginTop: 50,
                marginLeft: 20,
                fontSize: FONTS.SIZE.TITLE,
              }}
            >
              수량
            </Text>
            <View
              style={{
                marginTop: 15,
                marginHorizontal: 20,
                alignSelf: "stretch",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <TextInput
                style={{
                  height: 50,
                  width: 150,
                  borderColor: "lightgray",
                  borderWidth: 1,
                }}
                keyboardType="numeric"
                placeholder="입력"
              />
              <DropDownPicker
                style={{ width: 100 }}
                items={[
                  { label: "kg", value: "kg" },
                  { label: "팩", value: "ea" },
                ]}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
              />
            </View>
            <View
              style={{
                marginTop: 4,
                marginHorizontal: 20,
                alignSelf: "stretch",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <AntDesign name="questioncircle" size={18} color={COLORS.DALGRAK} />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: FONTS.SIZE.INFO,
                }}
              >
                Tip! 한 팩에는 보통 10개 정도의 사과가 들어있습니다.
              </Text>
            </View>
  
            <Text
              style={{
                alignSelf: "flex-start",
                marginTop: 50,
                marginBottom: 50,
                marginLeft: 20,
                fontSize: FONTS.SIZE.TITLE,
              }}
            >
              마감일
            </Text>
  
          </ScrollView>
          <View
            style={{
              alignSelf: "stretch",
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "stretch",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: FONTS.SIZE.CONTENTS,
                  color: "white",
                }}
              >
                등록
              </Text>
            </TouchableOpacity>
          </View>
        </View>)
        }
      </View>
    )
  }

  _pickCategory = async () => {
    const parent = {
      depth: -1,
      name: "root",
    };
    const { getCategories } = this.props;
    const result = await getCategories(parent);
    if (result !== null) {
      const {
        navigation: { navigate },
      } = this.props;

      this.props.navigation.navigate("UploadCategory", {
        categories: result,
      });
    }
  };
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "white" 
  },
});

export default Container;
