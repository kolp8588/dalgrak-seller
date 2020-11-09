import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import { ProgressBar } from 'react-native-paper';

import { COLORS, FONTS } from "../../constants";
const { width, height } = Dimensions.get("window");

const SignUpBusinessInfoScreen = (props) => (
  <View style={styles.container}>
    <ProgressBar progress={0.66} style={{height: 8}} color={COLORS.DALGRAK} />
    <View style={styles.content}>
      <View style={[styles.inputBox, {
            borderColor: props.businessIdErrorMsg != "" ? COLORS.WARNING : COLORS.MINOR
        }]}>
      <TextInput
        placeholder="사업자번호"
        style={styles.textInput}
        autoCapitalize={"none"}
        autoCorrect={false}
        keyboardType='numeric'
        maxLength={10}
        value={props.businessId}
        onChangeText={props.changeBusinessId}
      />
      {props.businessIdErrorMsg != "" && 
        (<Text style={styles.errorText}>{props.businessIdErrorMsg}</Text>)}
      </View>
      <View style={[styles.inputBox, {
            borderColor: props.phoneNumberErrorMsg != "" ? COLORS.WARNING : COLORS.MINOR
        }]}>
      <TextInput
        placeholder="사업자 핸드폰"
        style={styles.textInput}
        keyboardType='numeric'
        maxLength={11}
        autoCapitalize={"none"}
        value={props.phoneNumber}
        onChangeText={props.changePhoneNumber}
      />
      {props.phoneNumberErrorMsg != "" && 
        (<Text style={styles.errorText}>{props.phoneNumberErrorMsg}</Text>)}
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
              <Text style={styles.btnText}>다음</Text>
          </View>
        </TouchableOpacity>     
      </View> 
    </View>
  </View>
);

SignUpBusinessInfoScreen.propTypes = {
  businessId: PropTypes.string.isRequired,
  businessIdErrorMsg: PropTypes.string,
  phoneNumber: PropTypes.string.isRequired,
  phoneNumberErrorMsg: PropTypes.string,
  isComplete: PropTypes.bool.isRequired,
  goBack: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
    fontSize: FONTS.SIZE.CONTENTS,
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

export default SignUpBusinessInfoScreen;