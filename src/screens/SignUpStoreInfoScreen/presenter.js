import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import { ProgressBar } from 'react-native-paper';
import Postcode from 'react-native-daum-postcode';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, FONTS } from "../../constants";
const { width, height } = Dimensions.get("window");

const SignUpStoreInfoScreen = (props) => (
  <View style={styles.container}>
    <Modal
        animationType="fade"
        transparent={true}
        visible={props.isModalVisible}
      >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Postcode
            jsOptions={{ animated: true }}
            onSelected={(data) => props.selectAddress(data)}
          />
          <TouchableOpacity style={{margin: 10 }} 
            onPress={() => {
                props.onChangeModalVisibility(false);
            }}>
            <View style={styles.button}>
              <Text style={styles.btnText}>취소</Text>
            </View>
            </TouchableOpacity>     
        </View>
      </View>
    </Modal>
    <ProgressBar progress={1} style={{height: 8}} color={COLORS.DALGRAK} />
    <View style={{alignItems: "center",}}>
      <View style={{flexDirection: "row", marginTop: 50, justifyContent: "center"}}>
        <View style={styles.progressDisabled}/>
        <View style={styles.progressDisabled}/>
        <View style={styles.progress}/>
      </View>
      <Text style={{color: COLORS.GRAY_LINE, marginTop: 10}}>
        달그락 입점을 축하드려요!
      </Text>
    </View>
    <View style={styles.content}>
      <View style={[styles.inputBox, {
            borderColor: props.storeNameErrorMsg != "" ? COLORS.WARNING : COLORS.MINOR
        }]}>
        <TextInput
          placeholder="상호명"
          style={styles.textInput}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={props.storeName}
          onChangeText={props.changeStoreName}
        />
        {props.storeNameErrorMsg != "" && 
          (<Text style={styles.errorText}>{props.storeNameErrorMsg}</Text>)}
      </View>
      <View style={[styles.inputBox, {
            borderColor: props.phoneNumberErrorMsg != "" ? COLORS.WARNING : COLORS.MINOR
        }]}>
        <TextInput
          placeholder="상점 전화번호"
          style={styles.textInput}
          autoCapitalize={"none"}
          autoCorrect={false}
          keyboardType='numeric'
          value={props.phoneNumber}
          maxLength={11}
          onChangeText={props.changePhoneNumber}
        />
        {props.phoneNumberErrorMsg != "" && 
            (<Text style={styles.errorText}>{props.phoneNumberErrorMsg}</Text>)}
      </View>
      
      <View style={[styles.inputBox, {
        borderColor: props.addressErrorMsg != "" ? COLORS.WARNING : COLORS.MINOR,
        }]}>
        <View style={{flexDirection: "row"}}>
          <TextInput
              placeholder="주소"
              style={[styles.textInput, {width : width - 140, paddingLeft: 15}]}
              value={props.address}
              editable={false}
            />
          <TouchableOpacity style={{width: 100, justifyContent: "center", alignItems: "center"}} 
            onPress={() => {
                props.onChangeModalVisibility(true);
            }}>
              <View style={styles.searchButton}>
                <Text style={styles.searchButtonText}>검색</Text>
            </View>
          </TouchableOpacity>
        </View>
        {props.addressErrorMsg != "" && 
          (<Text style={styles.errorText}>{props.addressErrorMsg}</Text>)}
      </View>
      <View style={[styles.inputBox, {
              borderColor: props.detailAddressErrorMsg != "" ? COLORS.WARNING : COLORS.MINOR
          }]}>
          <TextInput
              placeholder="상세주소"
              style={styles.textInput}
              value={props.detailAddress}
              onChangeText={props.changeDetailAddress}
            />
          {props.detailAddressErrorMsg != "" && 
            (<Text style={styles.errorText}>{props.detailAddressErrorMsg}</Text>)}
        </View>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.touchable} onPressOut={props.goBack}>
          <View style={styles.button}>
              <Text style={styles.btnText}>이전</Text>
          </View>
        </TouchableOpacity>      

        <TouchableOpacity style={styles.touchable} 
          onPressOut={props.submit}
          disabled={!props.isComplete}>
        <View style={[styles.button, {
              backgroundColor:
                props.isComplete
                  ? COLORS.DALGRAK
                  : COLORS.MINOR,
            }]}>
          {props.isSubmitting ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.btnText}>입점신청</Text>
          )}
        </View>
        </TouchableOpacity>     
      </View>
             
    </View>
  </View>
);

SignUpStoreInfoScreen.propTypes = {
  storeName: PropTypes.string.isRequired,
  storeNameErrorMsg: PropTypes.string,
  phoneNumber: PropTypes.string.isRequired,
  phoneNumberErrorMsg: PropTypes.string,
  address: PropTypes.string.isRequired,
  addressErrorMsg: PropTypes.string,
  detailAddress: PropTypes.string.isRequired,
  detailAddressErrorMsg: PropTypes.string,
  isComplete: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  goBack: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  progress: {
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: COLORS.DALGRAK,
    borderColor: COLORS.DALGRAK,
    borderWidth: 5,
    marginHorizontal: 10,
  },
  progressDisabled: {
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_LINE,
    borderColor: COLORS.GRAY_LINE,
    borderWidth: 5,
    marginHorizontal: 10,
  },
  header: {
    flex: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  logo: {
    width: 250,
    resizeMode: "contain",
    marginTop: 50,
  },
  content: {
    flex: 4,
    backgroundColor: "white",
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  fbContainer: {
    marginTop: 30,
  },
  fbView: {
    flexDirection: "row",
    alignItems: "center",
  },
  fbText: {
    color: "gray",
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 14,
  },
  inputBox: {
    marginBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  errorText: {
    paddingHorizontal: 10,
    marginBottom: 10,
    color: COLORS.WARNING,
    fontSize: FONTS.SIZE.INFO,
  },
  textInput: {
    height: 50,
    width: width - 40,
    paddingHorizontal: 15,
    fontSize: FONTS.SIZE.CONTENTS,
  },
  touchable: {
    borderRadius: 5,
    backgroundColor: "#3E99EE",
    width: width / 2 - 30,
    marginHorizontal: 10,
    marginTop: 25,
  },
  searchButton: {
    paddingHorizontal: 7,
    backgroundColor: COLORS.GRAY_LINE,
    height: 50,
    width: 100,
    justifyContent: "center",
    borderRadius: 5,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 12,
  },
  button: {
    paddingHorizontal: 7,
    backgroundColor: COLORS.DALGRAK,
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
});

export default SignUpStoreInfoScreen;
