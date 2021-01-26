import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { COLORS } from "../../constants";

const { height, width } = Dimensions.get("window");

const SimpleUpload = ({ onPressOut, simpleUpload }) => (
  <View style={styles.container}>
    <Text>
      {simpleUpload.category.name}
    </Text>
    <TouchableOpacity onPressOut={onPressOut}>
     <AntDesign name="close" size={18} color={COLORS.DALGRAK} />
    </TouchableOpacity>
  </View>
);


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

export default SimpleUpload;
