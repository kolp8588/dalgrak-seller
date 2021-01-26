import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { COLORS } from "../../constants";

const { height, width } = Dimensions.get("window");

const Add = ({onAddPress}) => (
  <View>    
    <TouchableOpacity 
      style={styles.container}
      onPressOut={onAddPress}
      >
      <Text style={{color: "white"}}>
        등록
      </Text>
      <AntDesign name="plus" size={18} color="white" />
    </TouchableOpacity>
  </View>
);

Add.propTypes = {
};

const styles = StyleSheet.create({
  container: {        
    flexDirection: "row",
    width: (width - 50) / 4,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: COLORS.DALGRAK,
    borderColor: COLORS.DALGRAK,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  
});

export default Add;
