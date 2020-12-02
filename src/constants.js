import { StyleSheet } from "react-native";

export const COLORS = {
  DALGRAK: "#23344E",
  MINOR: "#bbb",
  WARNING: "#EB5757",
  INPUT: "#F2F2F2",
  LIGHT_BLACK: "#4F4F4F",
  DISABLED: "#E0E0E0",
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
  PASSWORD_ERROR: "비밀번호를 확인해주세요.(8~16자, 영문,숫자 조합)",
  PASSWORD_CHECK_ERROR: "비밀번호가 일치하지 않습니다.",
  BUSINESS_ID_ERROR: "사업자번호 형식이 올바르지 않습니다.",
  PHONE_NUMBER_ERROR: "핸드폰번호를 확인해주세요.",
  SIMPLE_UPLOAD_INFO_PLACEHOLDER: "등록하실 상품을 소개하는 정보를 입력해주세요.",
  SIMPLE_UPLOAD_PICKER_INFO: "구매자에게 제공할 상품 사진을 등록하세요(최대 5개)"
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
