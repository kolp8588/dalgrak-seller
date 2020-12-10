import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import Dalgrak from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {};

  render() {
    return (
      <Dalgrak {...this.props} {...this.state} />
    );
  }
}

export default Container;
