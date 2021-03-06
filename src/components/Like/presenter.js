import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { COLORS } from "../../constants";

const { height, width } = Dimensions.get("window");

const Like = ({ onPressOut, like }) => (
  <View style={styles.container}>
    <Text>
      {like.name}
    </Text>
    <TouchableOpacity onPressOut={onPressOut}>
      <AntDesign name="close" size={18} color={COLORS.DALGRAK} />
    </TouchableOpacity>
  </View>
);

Like.propTypes = {
  category: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {        
    flexDirection: "row",
    width: (width - 60) / 4,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 5,
    padding: 5,
    borderColor: COLORS.MINOR,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default Like;
