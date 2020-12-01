import React, { Component } from "react";

import CategoryScreen from "./presenter";

class Container extends Component {
  state = {
    isSelected: false,
    item: null,
    categories: null,
  };
  render() {
    return (
      <CategoryScreen
        {...this.state}
        {...this.props.route.params}
        pickPhoto={this._pickPhoto}
        approvePhoto={this._approvePhoto}
        pickCategory={this._pickCategory}
      />
    );
  }
  _pickItem = (item) => {
    this.setState({
      pickedItem: item,
    });
  };
  _pickCategory = async (parent) => {
    const { getCategories, addCategory } = this.props;
    const result = await getCategories(parent);
    if (result !== null) {
      this.props.navigation.push("UploadCategory", {
        categories: result,
      });
    } else if (this.props.category !== null) {
      this.props.navigation.popToTop();
      this.props.navigation.navigate("SimpleUpload", {category: this.props.category});
    }
  };
}

export default Container;
