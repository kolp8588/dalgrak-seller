import React from "react";
import {Component} from "react";
import Add from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {};

  render() {
    return (
      <Add 
        {...this.props} 
        {...this.state}
        />
    );
  }
}

export default Container;
