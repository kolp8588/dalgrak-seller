import React from "react";
import {Component} from "react";
import Like from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {};

  render() {
    return (
      <Like 
        {...this.props} 
        {...this.state}
        onPressOut={this._onPressOut} />
    );
  }

  _onPressOut = async () => {
    const { removeCategory } = this.props;
    await removeCategory(this.props.like.id);
  }
}

export default Container;
