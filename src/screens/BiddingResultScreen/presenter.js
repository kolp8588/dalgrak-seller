import React, { useState, useEffect, Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

function BiddingResultScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

BiddingResultScreen.propTypes = {};

export default BiddingResultScreen;
