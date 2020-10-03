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
      <Dalgrak parseDate={this._parseDate} {...this.props} {...this.state} />
    );
  }
  _parseDate = (date) => {
    const words = date.split(" ");
    let result = "";
    for (let i = 0; i <= 3; i++) {
      result = result.concat(words[i]);
      if (i != 3) {
        result = result.concat("/");
      }
    }
    return result;
  };
}

export default Container;
