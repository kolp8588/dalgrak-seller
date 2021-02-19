import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";

import { COLORS, FONTS } from "../../constants";
const { width, height } = Dimensions.get("window");

const SignUpScreen = (props) => (
  <View style={styles.container}>
    <View style={{alignItems: "center",}}>
      <View style={{flexDirection: "row", marginTop: 50, justifyContent: "center"}}>
        <View style={styles.progress}/>
        <View style={styles.progressDisabled}/>
        <View style={styles.progressDisabled}/>
      </View>
      <Text style={{color: COLORS.GRAY_LINE, marginTop: 10}}>
        환영합니다 :)
      </Text>
    </View>
    <View style={styles.content}>
    <View style={[styles.inputBox, {
          borderColor: props.isValidUsername == false && props.usernameErrorMsg != "" ? COLORS.WARNING : COLORS.MINOR
        }]}>
        <View style={{flexDirection: "row"}}>
          <TextInput
            placeholder="닉네임"
            style={[styles.textInput, {width : width - 140, paddingLeft: 15}]}
            autoCapitalize={"none"}
            autoCorrect={false}
            value={props.username}
            onChangeText={props.changeUsername}
            maxLength={10}
          />
          <TouchableOpacity style={{width: 100, justifyContent: "center", alignItems: "center"}} 
            onPress={() => {
                props.usernameDupCheck();
            }}>
              <View style={styles.searchButton}>
                <Text style={styles.searchButtonText}>중복확인</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {props.usernameErrorMsg != "" && 
      (<Text style={[styles.errorText, {color: props.isValidUsername ? 
        COLORS.DALGRAK : COLORS.WARNING}]}>
          {props.usernameErrorMsg}</Text>)}
      <View style={[styles.inputBox, {
          borderColor: props.isValidEmail == false && props.emailErrorMsg != "" ? COLORS.WARNING : COLORS.MINOR
        }]}>
          <View style={{flexDirection: "row"}}>
            <TextInput
              placeholder="이메일"
              style={[styles.textInput, {width : width - 140, paddingLeft: 15}]}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={props.email}
              onChangeText={props.changeEmail}
              maxLength={30}
            />
            <TouchableOpacity style={{width: 100, justifyContent: "center", alignItems: "center"}} 
                onPress={() => {
                    props.emailDupCheck();
                }}>
                  <View style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>중복확인</Text>
                </View>
            </TouchableOpacity>
          </View>
      </View>
      {props.emailErrorMsg != "" && 
      (<Text style={[styles.errorText, {color: props.isValidEmail ? 
        COLORS.DALGRAK : COLORS.WARNING}]}>
          {props.emailErrorMsg}</Text>)}
      <View style={[styles.inputBox, {
          borderColor: props.passwordErrorMsg != "" ? COLORS.WARNING : COLORS.MINOR
        }]}>
        <TextInput
          placeholder="비밀번호 (영문, 숫자 조합 8~16 글자)"
          style={styles.textInput}
          autoCapitalize={"none"}
          textContentType={'oneTimeCode'}
          secureTextEntry={true}
          value={props.password}
          onChangeText={props.changePassword}
          returnKeyType={"send"}
          onSubmitEditing={props.submit}
          maxLength={16}
        />
      </View>
      {props.passwordErrorMsg != "" && 
      (<Text style={styles.errorText}>{props.passwordErrorMsg}</Text>)}
      <View style={[styles.inputBox, {
          borderColor: props.passwordCheckErrorMsg != "" ? COLORS.WARNING : COLORS.MINOR
        }]}>
        <TextInput
          placeholder="비밀번호 확인"
          style={styles.textInput}
          autoCapitalize={"none"}
          textContentType={'oneTimeCode'}
          secureTextEntry={true}
          value={props.passwordCheck}
          onChangeText={props.changePasswordCheck}
          returnKeyType={"send"}
          onSubmitEditing={props.submit}
          maxLength={16}
        />
      </View>
      {props.passwordCheckErrorMsg != "" && 
        (<Text style={styles.errorText}>{props.passwordCheckErrorMsg}</Text>)}
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

SignUpScreen.propTypes = {
  username: PropTypes.string.isRequired,
  usernameErrorMsg: PropTypes.string,
  email: PropTypes.string.isRequired,
  emailErrorMsg: PropTypes.string,
  password: PropTypes.string.isRequired,
  passwordErrorMsg: PropTypes.string,
  passwordCheck: PropTypes.string.isRequired,
  passwordCheckErrorMsg: PropTypes.string,
  isComplete: PropTypes.bool.isRequired,
  goBack: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
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
    marginBottom: 10,
    color: COLORS.WARNING,
    fontSize: FONTS.SIZE.INFO,
    alignSelf: "flex-start",
    marginLeft: 20,
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
    borderRadius: 5,
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
});

export default SignUpScreen;
