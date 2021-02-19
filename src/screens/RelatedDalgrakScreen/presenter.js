import React from "react";
import {
  ActivityIndicator,
  Modal,
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import FadeIn from "react-native-fade-in-image";
import { AntDesign } from '@expo/vector-icons';
import DalgrakDetail from "../../components/DalgrakDetail";

import { COLORS, COMMON_STYLES, FONTS } from "../../constants";

const { height, width } = Dimensions.get("window");

const RelatedDalgrakScreen = (props) => {
  var bidding = props.route.params.bidding;
  var dalgrak = bidding.dalgrak;
  
  return (
    <ScrollView style={styles.container}>
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
              입찰을 취소하시겠습니까?
            </Text>
            <View style={{flexDirection: "row", alignSelf: "center"}}>
              <AntDesign name="exclamationcircle" size={18} color={COLORS.WARNING} />
              <Text style={{
                  color: COLORS.WARNING, 
                  marginLeft: 5,
                  marginBottom: 20,
                }}>
                진행중인 입찰을 취소할 경우 달그락 점수에 영향을 줄 수 있습니다!
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
        visible={props.isSuccess}
        onRequestClose={() => {
          props.goBack();
        }}
      >
        <View style={styles.backgroundView}>
          <View style={{alignItems: "center", marginHorizontal: 20}}>
            <FadeIn>
              <Image
                source={require("../../../assets/images/dalgrak-character1.png")}
                style={{
                  resizeMode: "contain",
                  width: width * 0.4,
                  height: height * 0.4,
                }}
              />
            </FadeIn>
            <Text style={{
                color: COLORS.WARNING,
                fontSize: FONTS.SIZE.TITLE,
                textAlign: "center",
                marginBottom: 150,
                fontWeight: "bold"
              }}>
              낙찰을 축하드립니다!!
            </Text>
            <View
              style={{ 
                flexDirection: "row", 
                justifyContent: "space-between" 
              }}
            >
              <TouchableHighlight
                style={{ 
                  flex: 1, 
                  height: 50, 
                  marginHorizontal: 10,
                  justifyContent: "center", 
                  backgroundColor: COLORS.DALGRAK, 
                  borderRadius: 5
                }}
                onPress={() => {
                  props.goBack();
                }}
              >
                <Text style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: FONTS.SIZE.CONTENTS
                  }}>
                    달그락 목록
                  </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ 
                  flex: 1, 
                  height: 50,
                  marginHorizontal: 10,
                  justifyContent: "center", 
                  backgroundColor: COLORS.DALGRAK, 
                  borderRadius: 5
                }}
                onPress={() => {
                  props.moveSuccess();
                }}
              >
                {props.isSubmitting ? (
                  <ActivityIndicator size="large" color={COLORS.DALGRAK} />
                ) : (
                  <Text style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: FONTS.SIZE.CONTENTS
                  }}>
                    낙찰 상세보기
                  </Text>
                )}
              </TouchableHighlight>
            </View> 
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.isFail}
        onRequestClose={() => {
          props.goBack();
        }}
      >
        <View style={styles.backgroundView}>
          <View style={{alignItems: "center", marginHorizontal: 20}}>
            <FadeIn>
              <Image
                source={require("../../../assets/images/dalgrak-character2.png")}
                style={{
                  resizeMode: "contain",
                  width: width * 0.4,
                  height: height * 0.4,
                }}
              />
            </FadeIn>
            <Text style={{
                color: COLORS.WARNING,
                fontSize: FONTS.SIZE.TITLE,
                textAlign: "center",
                marginBottom: 10,
                fontWeight: "bold"
              }}>
              아쉽지만 다음 기회에..
            </Text>
            <Text style={{
                fontSize: FONTS.SIZE.CONTENTS,
                textAlign: "center",
                marginBottom: 140,
                fontWeight: "bold"
              }}>
              입찰에 참여해 주셔서 진심으로 감사드립니다
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableHighlight
                style={{ 
                  flex: 1, 
                  height: 50, 
                  marginHorizontal: 10,
                  justifyContent: "center", 
                  backgroundColor: COLORS.DALGRAK, 
                  borderRadius: 5
                }}
                onPress={() => {
                  props.goBack();
                }}
              >
                <Text style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: FONTS.SIZE.CONTENTS
                  }}>
                    달그락 목록
                  </Text>
              </TouchableHighlight>
            </View> 
          </View>
        </View>
      </Modal>
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
        <Text style={{fontSize: FONTS.SIZE.H1, color: COLORS.DALGRAK, marginBottom: 10}}>
          참여 업체
        </Text>
        <Text style={styles.contents}>
          {dalgrak.biddings ? dalgrak.biddings.length : 0} 개
        </Text>
      </View>
      <View
        style={{
          height: 50,
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        {bidding.status == "IN_PROGRESS" &&
          <TouchableOpacity
            style={[styles.button, { flex: 1, backgroundColor: COLORS.WARNING }]}
            onPress={() => {
              props.onPressSubmit(true);
            }}
          >
            <Text style={styles.buttonText}>입찰 취소</Text>
          </TouchableOpacity>
        }        
      </View>
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
});

RelatedDalgrakScreen.propTypes = {};

export default RelatedDalgrakScreen;
