import React from "react";
import {
  ActivityIndicator,
  Modal,
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import FadeIn from "react-native-fade-in-image";
import { AntDesign } from '@expo/vector-icons';
import DalgrakDetail from "../../components/DalgrakDetail";

import { COLORS, COMMON_STYLES, FONTS } from "../../constants";

const { height, width } = Dimensions.get("window");

const SuccessfulBiddingScreen = (props) => {
  var bidding = props.route.params.bidding;
  var dalgrak = bidding.dalgrak;
  
  return (
    <ScrollView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.isCancelModalVisible}
        onRequestClose={() => {
          props.onPressSubmit(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: FONTS.SIZE.TITLE,
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 20,
                alignSelf: "center",
              }}
            >
              낙찰을 취소하시겠습니까?
            </Text>
            <View style={{flexDirection: "row", alignSelf: "center"}}>
              <AntDesign name="exclamationcircle" size={18} color={COLORS.WARNING} />
              <Text style={{
                  color: COLORS.WARNING, 
                  marginLeft: 5,
                  marginBottom: 20,
                }}>
                낙찰을 취소할 경우 달그락 점수에 영향을 줄 수 있습니다!
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableHighlight
                style={{ flex: 1, height: 50, justifyContent: "center" }}
                onPress={() => {
                  props.onPressCancel(false);
                }}
              >
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ flex: 1, height: 50, justifyContent: "center" }}
                onPress={() => {
                  props.cancel();
                }}
              >
                {props.isSubmitting ? (
                  <ActivityIndicator size="large" color={COLORS.DALGRAK} />
                ) : (
                  <Text style={[styles.modalButtonText, {color: COLORS.WARNING}]}>확인</Text>
                )}
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.isModalVisible}
        onRequestClose={() => {
          props.onPressSubmit(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: FONTS.SIZE.TITLE,
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 20,
                alignSelf: "center",
              }}
            >
              배송을 완료하셨습니까?
            </Text>
            <View style={{flexDirection: "row", alignSelf: "center"}}>
              <AntDesign name="exclamationcircle" size={18} color={COLORS.DALGRAK} />
              <Text style={{
                  color: COLORS.DALGRAK, 
                  marginLeft: 5,
                  marginBottom: 20,
                }}>
                구매자에게 송장번호가 공개됩니다!
              </Text>
            </View>
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
                  <Text style={[styles.modalButtonText, {color: COLORS.DALGRAK}]}>확인</Text>
                )}
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <DalgrakDetail {...dalgrak} />
      <View style={{marginHorizontal: 15}}>
      <View
          style={{
            borderTopWidth: 1,
            borderTopColor: COLORS.MINOR,
            marginVertical: 10,
          }}
        />
        <Text style={{fontSize: FONTS.SIZE.H1, color: COLORS.DALGRAK, marginBottom: 10}}>
          내 입찰 내역
        </Text>
        <Text style={styles.contents}>
          입찰단가 : {bidding.price} 원 / {dalgrak.unit}
        </Text>
        <Text style={styles.contents}>
          배송비 : 0 원
        </Text>
        <Text style={styles.contents}>
          총 입찰 금액 : {bidding.total} 원
        </Text>
        <Text style={styles.contents}>
          코멘트 : {bidding.comment}
        </Text>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: COLORS.MINOR,
            marginVertical: 10,
          }}
        />        
      </View>
      <View
        style={{          
          marginVertical: 10,
        }}
      >
        <View style={{
            flexDirection: "row",
            alignItems: "center"
        }}>
          <TextInput
            placeholder="송장번호를 입력하세요"
            style={styles.textInput}
            autoCapitalize={"none"}
            autoCorrect={false}
            value={props.shippingNumber}
            onChangeText={props.changeShippingNumber}
            maxLength={13}
            keyboardType='numeric'
          />
          <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.onPressSubmit(true);
          }}
        >
          <Text style={styles.buttonText}>배송 출발</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.WARNING }]}
          onPress={() => {
            props.onPressCancel(true);
          }}
        >
          <Text style={styles.buttonText}>낙찰 취소</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundView: {
    flex: 1,
    paddingTop: 100,    
    backgroundColor: "rgba(242, 242, 242, 0.8)",
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
  modalButtonText: {
    color: COLORS.LIGHT_BLACK,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: FONTS.SIZE.H1,
  },
  contents:{
    marginVertical:5,
    fontSize: FONTS.SIZE.CONTENTS
  },
  button: {
    flex: 1, 
    height: 50,
    marginVertical: 5,
    backgroundColor: COLORS.DALGRAK,
    borderRadius: 5,
    marginHorizontal: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: FONTS.SIZE.CONTENTS,
  },
  textInput: {
    height: 50,
    width: width * 0.6,
    textAlign: "center",
    marginHorizontal: 10,
    fontSize: FONTS.SIZE.CONTENTS,
    borderColor: "lightgray",
    borderWidth: 1,
  },
});

SuccessfulBiddingScreen.propTypes = {};

export default SuccessfulBiddingScreen;
