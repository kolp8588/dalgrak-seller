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
