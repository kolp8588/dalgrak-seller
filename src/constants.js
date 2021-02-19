import { StyleSheet } from "react-native";

export const COLORS = {
  DALGRAK: "#4BBFAE",
  DALGRAK_MEDIUM: "#009E91",
  DALGRAK_DARK: "#007970",
  SUCCESS: "#27AE60",
  MINOR: "#bbb",
  WARNING: "#EB5757",
  INPUT: "#F2F2F2",
  LIGHT_BLACK: "#4F4F4F",
  DISABLED: "#E0E0E0",
  GRAY_BACKGROUND: "#F5F5F6",
  GRAY_LINE: "#BBBDC0"
};

export const FONTS = {
  SIZE: {
    TITLE: 22,
    H1: 20,
    CONTENTS: 16,
    INFO: 14,
  },
};

export const MESSAGES = {
  EMAIL_ERROR: "이메일 형식이 올바르지 않습니다.",
  EMAIL_DUP_ERROR: "이미 가입 된 이메일 주소입니다.",
  EMAIL_NOT_DUP: "사용 가능한 이메일 주소입니다..",
  USERNAME_ERROR: "닉네임을 확인해주세요.(2~10자, 한글,영문,숫자 조합).",
  USERNAME_DUP_ERROR: "이미 사용중인 닉네임입니다.",
  USERNAME_NOT_DUP: "사용 가능한 닉네임입니다.",
  PASSWORD_ERROR: "비밀번호를 확인해주세요.(8~16자, 영문,숫자 조합)",
  PASSWORD_CHECK_ERROR: "비밀번호가 일치하지 않습니다.",
  BUSINESS_ID_ERROR: "사업자번호 형식이 올바르지 않습니다.",
  PHONE_NUMBER_ERROR: "핸드폰번호를 확인해주세요.",
  STORENAME_ERROR: "상호명을 확인해주세요.(1~20자, 한글,영문,숫자 조합).",
  SIMPLE_UPLOAD_INFO_PLACEHOLDER: "등록하실 상품을 소개하는 내용을 입력해주세요.",
  SIMPLE_UPLOAD_PICKER_INFO: "구매자에게 제공할 상품 사진을 등록하세요.(최대 5개)"
}

export const COMMON_STYLES = StyleSheet.create({
  CONTAINER: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  FLEX_START: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  LIST: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
