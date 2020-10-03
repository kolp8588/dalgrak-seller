import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import DalgrakDetail from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {};

  render() {
    return (
      <DalgrakDetail {...this.props} {...this.state} />
    );
  }
}

export default Container;
