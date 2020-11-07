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
import { ProgressBar } from 'react-native-paper';
import Postcode from 'react-native-daum-postcode';

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
            onSelected={(data) => props.selectAddress(JSON.stringify(data))}
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
    <View style={styles.content}>
      <TextInput
        placeholder="상호명"
        style={styles.textInput}
        autoCapitalize={"none"}
        autoCorrect={false}
        value={props.username}
        onChangeText={props.changeUsername}
      />
      <TextInput
        placeholder="상점 전화번호"
        style={styles.textInput}
        autoCapitalize={"none"}
        autoCorrect={false}
        value={props.username}
        onChangeText={props.changeUsername}
      />
      <TextInput
        placeholder="Password Check"
        style={styles.textInput}
        autoCapitalize={"none"}
        secureTextEntry={true}
        value={props.passwordCheck}
        onChangeText={props.changePasswordCheck}
        returnKeyType={"send"}
        onSubmitEditing={props.submit}
      />
      <TouchableOpacity style={styles.touchable} 
        onPress={() => {
            props.onChangeModalVisibility(true);
        }}>
        <View style={styles.button}>
          <Text style={styles.btnText}>주소</Text>
        </View>
        </TouchableOpacity>     
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.touchable} onPressOut={props.goBack}>
          <View style={styles.button}>
              <Text style={styles.btnText}>이전</Text>
          </View>
        </TouchableOpacity>      

        <TouchableOpacity style={styles.touchable} onPressOut={props.submit}>
        <View style={styles.button}>
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

SignUpStoreInfoScreen.propTypes = {};

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
    borderWidth: StyleSheet.hairlineWidth,
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
    backgroundColor: "#FAFAFA",
    fontSize: 14,
  },
  touchable: {
    borderRadius: 5,
    backgroundColor: "#3E99EE",
    width: width / 2 - 40,
    marginHorizontal: 10,
    marginTop: 25,
  },
  button: {
    paddingHorizontal: 7,
    backgroundColor: COLORS.DALGRAK,
    height: 50,
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
});

export default SignUpStoreInfoScreen;
