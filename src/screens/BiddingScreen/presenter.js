import React, { useState, useEffect, Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import Request from "../../components/Request";
import { COLORS, FONTS } from "../../constants";

const { height, width } = Dimensions.get("window");

function BiddingScreen(props) {
  var dalgrak = props.route.params.dalgrak;
  return (
    <ScrollView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.isModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalRow}>
              <Text style={styles.modalTitleText}>제품</Text>
              <Text style={styles.modalContentsText}>{dalgrak.category}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalTitleText}>마감</Text>
              <Text style={styles.modalContentsText}>{dalgrak.date}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalTitleText}>수량</Text>
              <Text style={styles.modalContentsText}>
                {dalgrak.quantity} {dalgrak.unit}
              </Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalTitleText}>배송지</Text>
              <Text style={styles.modalContentsText}>None</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalTitleText}>요청사항</Text>
              <Text style={styles.modalContentsText}>{dalgrak.request}</Text>
            </View>
            <View
              style={{
                borderTopColor: "lightgray",
                borderTopWidth: 1,
                marginBottom: 20,
              }}
            />
            <View style={styles.modalRow}>
              <Text style={styles.modalBiddingTitleText}>입찰단가</Text>
              <TextInputMask
                type={"money"}
                options={{
                  precision: 0,
                  delimiter: ",",
                  separator: " ",
                  unit: "",
                  suffixUnit: "원",
                }}
                style={[styles.modalBiddingText, { textAlignVertical: "top" }]}
                editable={false}
                value={props.price}
              />
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalBiddingTitleText}>총입찰금액</Text>
              <TextInputMask
                type={"money"}
                options={{
                  precision: 0,
                  delimiter: ",",
                  separator: " ",
                  unit: "",
                  suffixUnit: "원",
                }}
                style={[styles.modalBiddingText, { textAlignVertical: "top" }]}
                editable={false}
                value={props.total}
              />
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalBiddingTitleText}>코멘트</Text>
              <Text style={styles.modalBiddingText}>{props.comment}</Text>
            </View>
            <View
              style={{
                borderTopColor: "lightgray",
                borderTopWidth: 1,
                marginBottom: 20,
              }}
            />
            <Text
              style={{
                color: COLORS.DALGRAK,
                fontSize: FONTS.SIZE.H1,
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 20,
                alignSelf: "center",
              }}
            >
              입찰서를 제출 하시겠습니까?
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableHighlight
                style={{ flex: 1, height: 50, justifyContent: "center" }}
                onPress={() => {
                  props.onPressSubmit(false);
                }}
              >
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ flex: 1, height: 50, justifyContent: "center" }}
                onPress={() => {
                  props.submit();
                }}
              >
                {props.isSubmitting ? (
                  <ActivityIndicator size="large" color={COLORS.DALGRAK} />
                ) : (
                  <Text style={styles.modalButtonText}>확인</Text>
                )}
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      <Request {...dalgrak} />
      <View
        style={{
          borderTopColor: "lightgray",
          borderTopWidth: 1,
          marginHorizontal: 10,
          marginBottom: 20,
        }}
      />
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ fontSize: FONTS.SIZE.TITLE }}>입찰 정보</Text>
        <Text style={styles.title}>단가</Text>
        <View
          style={{
            alignContent: "center",
            marginLeft: 10,
            flexDirection: "row",
          }}
        >
          <TextInputMask
            type={"money"}
            options={{
              precision: 0,
              delimiter: ",",
              unit: "",
            }}
            value={props.price}
            maxLength={9}
            style={styles.textInputStyle}
            keyboardType="number-pad"
            onChangeText={(text) => props.onPriceChange(text)}
          />
          <Text
            style={{
              marginHorizontal: 10,
              alignSelf: "center",
              fontSize: FONTS.SIZE.CONTENTS,
            }}
          >
            원 / {dalgrak.unit}
          </Text>
        </View>
        <Text style={styles.title}>총 입찰 금액</Text>
        <View
          style={{
            alignContent: "center",
            marginLeft: 10,
            flexDirection: "row",
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
            value={props.total}
            style={styles.total}
          />
          <Text
            style={{
              alignSelf: "center",
              fontSize: FONTS.SIZE.TITLE,
              color: COLORS.DALGRAK,
            }}
          >
            {" "}
            원
          </Text>
        </View>
        <Text style={styles.title}>코멘트</Text>
        <DropDownPicker
          style={{ marginLeft: 10, width: width * 0.8 }}
          dropDownStyle={{ marginLeft: 10, marginTop: 2 }}
          items={[
            { label: "최저가 자신있습니다.", value: 1, selected: true },
            { label: "빠른 배송 가능합니다.", value: 2 },
            { label: "신선함으로는 최고입니다.", value: 3 },
          ]}
          defaultValue={1}
          onChangeItem={(item) => props.onCommentChange(item.label)}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          zIndex={100000}
        />
        <Text style={styles.title}>상품 정보</Text>
        <TextInput
          style={styles.info}
          value={props.info}
          multiline={true}
          maxLength={200}
          onChangeText={(text) => props.onInfoChange(text)}
        />

        <Text style={styles.title}>상품 사진</Text>
      </View>
      <TouchableOpacity
        style={{
          marginLeft: 20,
          alignItems: "flex-start",
        }}
        onPress={props.pickImage}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: COLORS.DALGRAK,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="plus"
            size={30}
            color={COLORS.DALGRAK}
            style={{}}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderTopColor: "lightgray",
          borderTopWidth: 1,
          marginTop: 20,
        }}
      />
      <View style={styles.images}>
        {props.images.map((image, idx) => {
          return (
            <Image key={idx} source={{ uri: image }} style={styles.image} />
          );
        })}
      </View>
      <View
        style={{
          height: 50,
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                props.total > 0 && props.images.length > 0
                  ? COLORS.DALGRAK
                  : "gray",
            },
          ]}
          disabled={!(props.total > 0 && props.images.length > 0)}
          onPress={() => {
            props.onPressSubmit(true);
          }}
        >
          <Text style={styles.buttonText}>입찰하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: width * 0.9,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitleText: {
    marginBottom: 15,
    fontSize: FONTS.SIZE.CONTENTS,
    color: "gray",
  },
  modalContentsText: {
    marginBottom: 15,
    width: width * 0.5,
    fontSize: FONTS.SIZE.CONTENTS,
  },
  modalBiddingTitleText: {
    marginBottom: 15,
    fontSize: FONTS.SIZE.CONTENTS,
    color: COLORS.DALGRAK,
    fontWeight: "bold",
  },
  modalBiddingText: {
    marginBottom: 15,
    width: width * 0.5,
    fontSize: FONTS.SIZE.CONTENTS,
    fontWeight: "bold",
  },
  modalButtonText: {
    color: COLORS.LIGHT_BLACK,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: FONTS.SIZE.H1,
  },

  button: {
    borderRadius: 5,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: FONTS.SIZE.CONTENTS,
  },
  title: {
    fontSize: FONTS.SIZE.H1,
    marginLeft: 5,
    marginTop: 15,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: "#bbb",
    borderWidth: StyleSheet.hairlineWidth,
    width: width / 4,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FAFAFA",
    fontSize: FONTS.SIZE.CONTENTS,
  },
  textInputStyle: {
    height: 40,
    width: 100,
    fontSize: FONTS.SIZE.CONTENTS,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  total: {
    height: 40,
    minWidth: 10,
    fontSize: FONTS.SIZE.TITLE,
    color: COLORS.DALGRAK,
    marginLeft: 10,
  },
  info: {
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: COLORS.INPUT,
    fontSize: FONTS.SIZE.CONTENTS,
  },
  images: {
    flexDirection: "row",
    marginVertical: 5,
    flexWrap: "wrap",
  },
  image: {
    width: width / 3,
    height: width / 3,
    borderColor: "white",
    borderWidth: 1,
  },
});

BiddingScreen.propTypes = {};

export default BiddingScreen;
