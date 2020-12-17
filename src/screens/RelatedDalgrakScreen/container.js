import React, { Component } from "react";
import RelatedDalgrakScreen from "./presenter";

class Container extends Component {
  state = {
    isModalVisible: false,
    isSubmitting: false,
  };
  render() {
    return <RelatedDalgrakScreen 
      {...this.state} 
      {...this.props} 
      submit={this.submit}
      onPressSubmit={this.onPressSubmit}
    />;
  }
  onPressSubmit = (bool) => {
    this.setState({
      isModalVisible: bool,
    });
  };

  submit = async () => {
    const {
      route: {
        params: { bidding },
      },
      submit,
    } = this.props;

    this.setState({
      isSubmitting: true,
    });
    if (await submit(bidding.id)) {
      this.setState({
        isSubmitting: false,
        isModalVisible: false,
      });
      this.props.navigation.goBack();
    }
  };
}

export default Container;
