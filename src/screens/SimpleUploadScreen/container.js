import React, { Component } from "react";
import PropTypes from "prop-types";
import { 
  Text, 
  View, 
  StyleSheet, 
  Dimensions,
  ScrollView, 
  Image, 
  TouchableOpacity 
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FadeIn from "react-native-fade-in-image";
import { TextInput } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";

import * as ImagePicker from "expo-image-picker";
import { COLORS, COMMON_STYLES, MESSAGES, FONTS } from "../../constants";

const { height, width } = Dimensions.get("window");

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      info: "",
      price: 0,
      total: 0,
      quantity: 0,
      images: [],
    };
  }

  componentDidMount() {
    this.setState({
      category: this.props.route.params.category,
    });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({
        images: [...this.state.images, result.uri],
      });
    }
  };

  onInfoChange = (text) => {
    this.setState({
      info: text,
    });
  };

  onPriceChange = (text) => {
    let value = text.split(",").join("");
    this.setState({
      price: value * 1,
      total: value * this.state.quantity,
    });
  };

  onQuantityChange = (text) => {
    let value = text.split(",").join("");
    this.setState({
      quantity: value * 1,
      total: value * this.state.price,
    });
  };

  submit = async () => {
    const { 
      category, 
      info, 
      price, 
      total, 
      quantity, 
      images
     } = this.state;
    const { submit } = this.props;
    
    const request = {
      category: category,
      info: info,
      price: price,
      total: total,
      quantity: quantity,
      images: images,
    };

    const uploadResult = await submit(request);
    if (uploadResult) {
      this.props.navigation.goBack();
    }
  };

  render() {
    const { 
      category,
      info, 
      images,
      price,
      total,
      quantity
    } = this.state;
    return (
      <View style={COMMON_STYLES.CONTAINER}>
        {category && (
          <View style={COMMON_STYLES.FLEX_START}>
          <ScrollView
            style={{
              flex: 1,
              alignSelf: "stretch",
            }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View style={{
              alignItems: "center",
            }}>
              <FadeIn>
                <Image
                  source={{ uri: category.imageUrl }}
                  style={{
                    width: 80,
                    height: 80,
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: COLORS.GRAY_LINE,
                    borderRadius: 5,
                  }}
                />
              </FadeIn>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: FONTS.SIZE.TITLE,
                  textAlignVertical: "center",
                }}
              >
                {category.name}
              </Text>
            </View>
            
            <Text style={styles.title}>
              상품 정보
            </Text>
            <TextInput
              style={styles.info}
              value={info}
              multiline={true}
              maxLength={200}
              placeholder={MESSAGES.SIMPLE_UPLOAD_INFO_PLACEHOLDER}
              onChangeText={this.onInfoChange}
            />
            <Text style={styles.title}>단위 단가</Text>

            <View
              style={{
                marginTop: 15,
                marginHorizontal: 20,
                alignSelf: "stretch",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInputMask
                type={"money"}
                options={{
                  precision: 0,
                  delimiter: ",",
                  unit: "",
                }}
                value={price}
                maxLength={9}
                style={styles.textInputStyle}
                keyboardType="number-pad"
                onChangeText={(text) => this.onPriceChange(text)}
              />
              <Text style={{
                fontSize: FONTS.SIZE.CONTENTS,
                textAlignVertical:"center",
                marginLeft: 5,
                marginRight: 10,
              }}>
                원 X
              </Text>
              <TextInputMask
                type={"money"}
                options={{
                  precision: 0,
                  delimiter: ",",
                  unit: "",
                }}
                value={quantity}
                maxLength={9}
                style={styles.textInputStyle}
                keyboardType="number-pad"
                onChangeText={(text) => this.onQuantityChange(text)}
              />
              <Text style={{
                fontSize: FONTS.SIZE.CONTENTS,
                textAlignVertical:"center",
                marginLeft: 5,
              }}>
                kg
              </Text>
            </View>
            <Text style={styles.title}>총 단가</Text>
            <View
              style={{
                flexDirection: "row",
                marginRight: 20,
                alignSelf: "flex-end"
              }}
            >
              <TextInputMask
                type={"money"}
                options={{
                  precision: 0,
                  delimiter: ",",
                  unit: "",
                }}
                editable={false}
                value={total}
                style={[styles.total]}
              />
              <Text
                style={{
                  fontSize: FONTS.SIZE.TITLE,
                  color: COLORS.DALGRAK,
                }}
              >
                {" "}
                원
              </Text>
            </View>
            <Text style={styles.title}>상품 사진</Text>
            <Text style={{
              alignSelf: "flex-start",
              color: COLORS.GRAY_LINE,
              fontSize: FONTS.SIZE.INFO,
              marginLeft: 20,
              marginVertical: 5,
            }}>
              {MESSAGES.SIMPLE_UPLOAD_PICKER_INFO}
            </Text>
            <TouchableOpacity
              style={{
                marginLeft: 20,
                alignItems: "flex-start",
                alignSelf: "flex-start"
                
              }}
              disabled={images.length == 5}
              onPress={this.pickImage}
            >
              <View
                style={{
                  height: 60,
                  width: 60,
                  marginTop: 5,
                  borderRadius: 5,
                  borderWidth:1,
                  borderColor: COLORS.GRAY_LINE,
                  backgroundColor: COLORS.GRAY_BACKGROUND,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={25}
                  color={images.length <= 5 ? COLORS.LIGHT_BLACK : COLORS.GRAY_LINE}
                  style={{}}
                />
                <Text>
                  {images.length}/5
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderTopColor: "lightgray",
                borderTopWidth: 1,
                marginTop: 20,
                width: width,
              }}
            />
            <View style={styles.images}>
              {images.map((image, idx) => {
                return (
                  <Image key={idx} source={{ uri: image }} style={styles.image} />
                );
              })}
            </View>
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
                backgroundColor: COLORS.DALGRAK,
              }}
              onPress={() => {
                this.submit();
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
  title: {
    alignSelf: "flex-start",
    marginTop: 30,
    marginLeft: 20,
    fontSize: FONTS.SIZE.TITLE,
  },
  info: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.GRAY_LINE,
    backgroundColor: COLORS.GRAY_BACKGROUND,
    alignSelf: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
    padding: 5,
    fontSize: FONTS.SIZE.CONTENTS,
  },
  images: {
    flexDirection: "row",
    marginVertical: 5,
    flexWrap: "wrap",
    alignSelf: "flex-start"
  },
  image: {
    width: width / 3,
    height: width / 3,
    borderColor: "white",
    borderWidth: 1,
  },
  textInputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.GRAY_LINE,
    backgroundColor: COLORS.GRAY_BACKGROUND,
    height: 40,
    width: 100,
    fontSize: FONTS.SIZE.CONTENTS,
    paddingLeft: 10,
  },
  total: {
    height: 40,
    fontSize: FONTS.SIZE.TITLE,
    color: COLORS.DALGRAK,
  },
});

export default Container;
