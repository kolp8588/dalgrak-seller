import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Like = ({ onPress, category }) => (
  <View style={styles.container}>
    <Text>
      {category}
    </Text>
    <TouchableOpacity onPressOut={onPress}>
      <View style={styles.item}>
        <Text>X</Text>
      </View>
    </TouchableOpacity>
  </View>
);

Like.propTypes = {
  category: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 50,
    borderRadius: 3,
    borderWidth: 1,
    padding: 5,
    justifyContent: "space-between",
    marginRight: 10,
  },
  item: {
    alignItems: "center",
  },
});

export default Like;
