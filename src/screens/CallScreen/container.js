import React, { Component } from "react";
import CallScreen from "./presenter";

class Container extends Component {
  state = {};

  render() {
    return <CallScreen {...this.state} {...this.props} />;
  }
}

export default Container;
