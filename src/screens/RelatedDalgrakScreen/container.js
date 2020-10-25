import React, { Component } from "react";
import RelatedDalgrakScreen from "./presenter";

class Container extends Component {
  render() {
    return <RelatedDalgrakScreen {...this.state} {...this.props} />;
  }
}

export default Container;
