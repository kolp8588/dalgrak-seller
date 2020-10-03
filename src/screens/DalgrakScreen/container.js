import React, { Component } from "react";
import DargrakScreen from "./presenter";

class Container extends Component {
  render() {
    return <DargrakScreen {...this.state} {...this.props} />;
  }
}

export default Container;
