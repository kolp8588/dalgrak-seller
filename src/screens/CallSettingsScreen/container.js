import React, { Component } from "react";
import CallSettingsScreen from "./presenter";

class Container extends Component {
  state = {};

  render() {
    return <CallSettingsScreen {...this.state} {...this.props} />;
  }
}

export default Container;
