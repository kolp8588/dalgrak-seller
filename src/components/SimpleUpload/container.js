import React from "react";
import {Component} from "react";
import SimpleUpload from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {};

  render() {
    return (
      <SimpleUpload 
        {...this.props} 
        {...this.state}
        onPressOut={this._onPressOut} />
    );
  }

  _onPressOut = async () => {
    const { removeSimpleUpload } = this.props;
    await removeSimpleUpload(this.props.simpleUpload.category.id);
  }
}

export default Container;
