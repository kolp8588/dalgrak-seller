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
import * as ImagePicker from "expo-image-picker";
import { COLORS, COMMON_STYLES, MESSAGES, FONTS } from "../../constants";

const { height, width } = Dimensions.get("window");

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
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

  render() {
    const { category, images } = this.state;
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
            <Text style={[styles.title, {marginTop: 20}]}>
              카테고리
            </Text>
            <View style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              marginLeft: 20,
            }}>
              <FadeIn>
                <Image
                  source={{ uri: category.imageUrl }}
                  style={{
                    width: 80,
                    height: 80,
                    marginTop: 10,
                    borderRadius: 100,
                  }}
                />
              </FadeIn>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: FONTS.SIZE.TITLE,
                  textAlignVertical: "center"
                }}
              >
                {category.name}
              </Text>
            </View>
            
            <Text style={styles.title}>
              정보
            </Text>
            <TextInput
              style={styles.info}
              value={this.props.info}
              multiline={true}
              maxLength={200}
              placeholder={MESSAGES.SIMPLE_UPLOAD_INFO_PLACEHOLDER}
            />
            <Text style={styles.title}>
              단가
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
                  paddingLeft: 5,
                }}
                keyboardType="numeric"
                placeholder="입력"
              />
              <Text style={{
                fontSize: FONTS.SIZE.TITLE,
                textAlignVertical:"center",
                marginLeft: 10,
              }}>
                원 / kg
              </Text>
            </View>
            <Text style={styles.title}>
              기본 중량
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
                  paddingLeft: 5,
                }}
                keyboardType="numeric"
                placeholder="입력"
              />
              <Text style={{
                fontSize: FONTS.SIZE.TITLE,
                textAlignVertical:"center",
                marginLeft: 10,
              }}>
                kg
              </Text>
            </View>
            <Text style={styles.title}>상품 사진</Text>
            <Text style={{
              alignSelf: "flex-start",
              fontSize: FONTS.SIZE.INFO,
              marginLeft: 25,
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
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: images.length <= 5 ? COLORS.DALGRAK : "gray",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={30}
                  color={images.length <= 5 ? COLORS.DALGRAK : "gray"}
                  style={{}}
                />
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
});

export default Container;