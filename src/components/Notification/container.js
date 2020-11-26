import React, { Component } from "react";
import Notification from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Notification 
        parseDate={this._parseDate} 
        {...this.props}
        {...this.state} 
      />
    );
  }

  _parseDate = (time) => {
    const date = new Date(time.seconds * 1000);
    
    return date;
  };
}

export default Container;
