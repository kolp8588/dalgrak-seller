import React, { Component } from "react";
import BiddingResultScreen from "./presenter";

class Container extends Component {
  state = {};

  render() {
    return <BiddingResultScreen {...this.state} {...this.props} />;
  }
}

export default Container;
