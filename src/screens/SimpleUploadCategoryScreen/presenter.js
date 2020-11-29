import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import PropTypes from "prop-types";
import { COMMON_STYLES, FONTS } from "../../constants";

const { height, width } = Dimensions.get("window");

class CategoryScreen extends Component {
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => this.props.pickCategory(item)}
      >
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={COMMON_STYLES.LIST}
          data={this.props.categories}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

CategoryScreen.propTypes = {
  pickedPhoto: PropTypes.object,
  photos: PropTypes.array,
  approvePhoto: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  item: {
    height: 100,
    marginVertical: 10,
    marginHorizontal: 85,
    borderColor: "#366671",
    borderWidth: 3,
    borderRadius: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategoryScreen;
