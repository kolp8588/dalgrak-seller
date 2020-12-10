import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SimpleUpload = ({ onPressOut, simpleUpload }) => (
  <View style={styles.container}>
    <Text>
      {simpleUpload.category.name}
    </Text>
    <TouchableOpacity onPressOut={onPressOut}>
      <View style={styles.item}>
        <Text>X</Text>
      </View>
    </TouchableOpacity>
  </View>
);

SimpleUpload.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 70,
    borderRadius: 3,
    borderWidth: 1,
    padding: 5,
    justifyContent: "space-between",
    marginRight: 10,
  },
  item: {
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export default SimpleUpload;
