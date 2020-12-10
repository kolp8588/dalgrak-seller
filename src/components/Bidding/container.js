import React, { Component } from "react";
import PropTypes from "prop-types";
import Bidding from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {};

  render() {
    return (
      <Bidding {...this.props} {...this.state} />
    );
  }
}

export default Container;
