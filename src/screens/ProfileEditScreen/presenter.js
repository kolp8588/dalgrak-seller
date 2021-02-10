
import React, { useEffect} from 'react';

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { COLORS, COMMON_STYLES, FONTS } from "../../constants";
import { TextInput } from "react-native-gesture-handler";
import ProfileNumber from "../../components/ProfileNumber";

const { height, width } = Dimensions.get("window");

const ProfileEditScreen = (props) => {
  console.log(props)
  return (
    <View style={styles.header}>
      
      <TouchableOpacity 
      style = {{
        marginbo:100
      }}>
        <ImageBackground
          source={require("../../../assets/images/noPhoto.jpg")}
          style={styles.avatar}
          imageStyle={{borderRadius: 50}}
          defaultSource={require("../../../assets/images/noPhoto.jpg")}
        >
        </ImageBackground>
      </TouchableOpacity>
      
      <View style={styles.headerColumn}>
        <View style={styles.profileNumbers}>
          <ProfileNumber
            number={"5"}
            text={"달그락"}
          />
          <ProfileNumber
            number={"80%"}
            text={"입찰율"}
          />
          <ProfileNumber
            number={"3%"}
            text={"낙찰율"}
          />
        </View>
      </View>

      <TextInput 
        value={props.username}  
        style = {styles.inputText}
        placeholder = "닉네임"
        onChangeText={props.changeUsername}
      />
      
      <View style={{flexDirection: 'row', alignItems: 'center' , marginTop:15}}>
        <View style={{flex: 1, height: 7, backgroundColor: '#F2F2F2'}} />
      </View>

      <View style= {{
        marginTop:10,
        marginLeft:10,
        marginBottom:20,
        alignSelf: "flex-start",
        flexDirection: "row",
        fontWeight: 'bold',
        fontSize: 30,
        }}>
        <Text style= {{
        alignSelf: "flex-start",
        fontWeight: 'bold',
        fontSize: 14,
        }}>
          이메일                 
        </Text>
        <Text style= {{
        marginLeft:59,
        fontWeight: 'bold',
        fontSize: 14,
        }}>
          {props.profile.userInfo.email}
        </Text>

      </View>
      <View style= {{
        marginTop:10,
        marginLeft:10,
        marginBottom:20,
        alignItems:"center",
        //alignSelf: "flex-start",
        fontWeight: 'bold',
        flexDirection: "row",
        fontSize: 30,
        }}>
        <Text style= {{
        alignItems: "center",
        fontWeight: 'bold',
        fontSize: 14,
        }}>
          비밀번호
        </Text>
        <TextInput 
          style = {{
            marginLeft:40,
            height: 30,
            alignSelf:"center",
            width: 200,
            backgroundColor:
                  props.setPassword == true
                    ? "white"  
                    : "#A4A4A4",
            borderColor: "#A4A4A4",
            borderWidth: 1
          }}
          value={props.profile.password}
          placeholder = "10-20자 이내" 
          secureTextEntry = { true }
          editable = { props.setPassword } 
          />
        <TouchableOpacity
                style={{
                  backgroundColor:COLORS.DALGRAK,
                  marginLeft:10,
                  width: 60,
                  alignSelf:"center",
                  height: 30,
                 }}
                 onPressOut={() => props.editPassword()}
              >
                <Text style={{
                  color:"white",
                  marginTop:7,
                  marginLeft:6,
                  fontWeight: 'bold', 
                }}>변경하기</Text>
        </TouchableOpacity>
      </View>
      <View style= {{
        marginTop:10,
        marginLeft:10,
        alignSelf: "flex-start",
        fontWeight: 'bold',
        flexDirection: "row",
        fontSize: 30,
        }}>
        <Text style= {{
        alignSelf: "flex-start",
        fontWeight: 'bold',
        fontSize: 14,
        }}>
          휴대폰 인증
        </Text>

      </View>
      <View style= {{
        marginTop:10,
        marginLeft:10,
        alignSelf: "flex-start",
        fontWeight: 'bold',
        flexDirection: "row",
        fontSize: 30,
        }}>
        <TextInput 
          style = {{
            height: 40,
            alignSelf:"center",
            width: 90,
            fontWeight: 'bold',
            textAlign:"center",
            borderColor: "#A4A4A4",
            borderWidth: 1
          }}
          editable = { false } 
        />
        <TextInput 
          style = {{
            height: 40,
            marginLeft: 10,
            alignSelf:"center",
            width: 90,
            fontWeight: 'bold',
            textAlign:"center",
            borderColor: "#A4A4A4",
            borderWidth: 1
          }}
          editable = { false }
        />
        <TextInput 
          style = {{
            height: 40,
            marginLeft: 10,
            alignSelf:"center",
            width: 90,
            fontWeight: 'bold',
            textAlign:"center",
            borderColor: "#A4A4A4",
            borderWidth: 1
          }}
          editable = { false }
        />
        <TouchableOpacity
                style={{
                  backgroundColor:COLORS.DALGRAK,
                  marginLeft:10,
                  width: 60,
                  alignSelf:"center",
                  height: 40,
                 }}
                // onPress={() => navigation.navigate("Events")}
              >
                <Text style={{
                  color:"white",
                  marginTop:12,
                  marginLeft:16,
                  fontWeight: 'bold', 
                }}>인증</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          alignSelf: "stretch",
          alignItems: "center",
          backgroundColor:COLORS.DALGRAK,
          marginTop: 100,
        }}
        onPressOut={props.profileSubmit}
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
 
  )
};


ProfileEditScreen.propTypes = {
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flex: 1,
    //marginTop: 15,
    //marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "flex-end"
    
  },
  inputText: {
    margin: 15,
    height: 30,
    width: 200,
    borderColor: "#A4A4A4",
    borderWidth: 1
  },
  headerColumn: {
    justifyContent: "center",
    width: width * 0.5,
  },
  profileNumbers: {
    flexDirection: "row",
    marginBottom: 7,
    justifyContent: "space-between",
  },
  contents: {
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: FONTS.SIZE.H1,
    marginBottom: 10,
  },
  name: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 13,
  },
  bio: {
    marginBottom: 5,
  },
  website: {
    color: "#003569",
  },
  modeBar: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "#bbb",
    borderWidth: StyleSheet.hairlineWidth,
  },
  modeIcon: {
    width: width / 2,
    alignItems: "center",
  },
  profieButton: {
    borderRadius: 3,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
    borderColor: "black" ,
    borderWidth: StyleSheet.hairlineWidth
  },
  button: {
    borderRadius: 3,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderColor: "black",
    borderWidth: StyleSheet.hairlineWidth
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  photoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});


export default ProfileEditScreen;
