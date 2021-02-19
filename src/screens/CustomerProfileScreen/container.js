import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "../../components/Profile";
import { Text, View } from "react-native";

class Container extends Component {
  static propTypes = {
  };

  render() {
    return (
      <View>
        <Text>
          Hello World!
        </Text>
      </View>
    );
  }

}

export default Container;
