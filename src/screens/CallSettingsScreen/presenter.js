import React, { useState, useEffect, Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

import { COLORS } from "../../constants";
const { height, width } = Dimensions.get("window");

function CallSettingsScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.callBox}>
        <Text style={{ color: "white", fontSize: 50 }}>콜 대기중</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  callBox: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 100,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: COLORS.DALGRAK,
    alignItems: "center",
    justifyContent: "center",
  },
});

CallSettingsScreen.propTypes = {};

export default CallSettingsScreen;
