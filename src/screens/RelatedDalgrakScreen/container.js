import React, { Component } from "react";
import RelatedDalgrakScreen from "./presenter";

class Container extends Component {
  state = {
    isModalVisible: false,
    isSuccess: false,
    isFail: false,
    isSubmitting: false,
  };
  
  componentDidMount() {
    const {
      route: {
        params: { bidding },
      },
    } = this.props;
    if (bidding.status == "WAITING_FOR_PAYMENT") {
      this.setState({
        isSuccess: true,
      });
    } else if (bidding.status == "FAIL") {
      this.setState({
        isFail: true,
      });
    }
  }

  render() {
    return <RelatedDalgrakScreen 
      {...this.state} 
      {...this.props} 
      submit={this.submit}
      onPressSubmit={this.onPressSubmit}
      goBack={this.goBack}
      moveSuccess={this.moveSuccess}
    />;
  }
  onPressSubmit = (bool) => {
    this.setState({
      isModalVisible: bool,
    });
  };

  goBack = () => {
    this.setState({
      isModalVisible: false,
      isSuccess: false,
      isFail: false,
      isSubmitting: false,
    });
    this.props.navigation.goBack();
  }

  moveSuccess = () => {
    this.setState({
      isModalVisible: false,
      isSuccess: false,
      isFail: false,
      isSubmitting: false,
    });
    const {
      route: {
        params: { bidding },
      },
    } = this.props;

    this.props.navigation.navigate("successful", {bidding : bidding});
  }

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
