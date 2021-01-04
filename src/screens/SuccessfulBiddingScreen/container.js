import React, { Component } from "react";
import SuccessfulBiddingScreen from "./presenter";

class Container extends Component {
  state = {
    isSubmitting: false,
    isModalVisible: false,
    isCancelModalVisible: false,
    shippingNumber: "",
  };

  render() {
    return <SuccessfulBiddingScreen 
      {...this.state} 
      {...this.props}
      submit={this.submit}
      cancel={this.cancel}
      onPressSubmit={this.onPressSubmit}
      onPressCancel={this.onPressCancel}
      changeShippingNumber={this.changeShippingNumber}
    />;
  }

  onPressSubmit = (bool) => {
    this.setState({
      isModalVisible: bool,
    });
  };

  onPressCancel = (bool) => {
    this.setState({
      isCancelModalVisible: bool,
    });
  };

  changeShippingNumber = (text) => {
    this.setState({ 
      shippingNumber: text,
    });
  };

  cancel = async () => {
    const {
      route: {
        params: { bidding },
      },
      cancel,
    } = this.props;

    this.setState({
      isSubmitting: true,
    });
    if (await cancel(bidding.id)) {
      this.setState({
        isSubmitting: false,
        isModalVisible: false,
      });
      this.props.navigation.goBack();
      this.props.navigation.goBack();
    }
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
      this.props.navigation.goBack();
    }
  };
}

export default Container;
