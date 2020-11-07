import React, { Component } from "react";
import SignUpStoreInfoScreen from "./presenter";

class Container extends Component {
  state = {
    storeName: "",
    phoneNumber: "",
    address: "",
    categories: [],
    isComplete: false,
    isSubmitting: false,
    isModalVisible: false,
  };
  render() {
    return (
      <SignUpStoreInfoScreen
        {...this.state}
        changeStoreName={this._changeStoreName}
        changePhoneNumber={this._changePhoneNumber}
        onChangeModalVisibility={this._onChangeModalVisibility}
        selectAddress={this._selectAddress}
        goBack={this._goBack}
        submit={this._submit}
      />
    );
  }
  _changeStoreName = (text) => {
    this.setState({ storeName: text });
  };
  _changePhoneNumber = (text) => {
    this.setState({ phoneNumber: text });
  };
  _selectAddress = (text) => {
    console.log(text)
    this.setState({
      address: text,
      isModalVisible: false,
    });
  };
  _onChangeModalVisibility = (bool) => {
    this.setState({
      isModalVisible: bool,
    });
  };
  _goBack = () => {
    this.props.navigation.goBack();
  };
  _submit = async () => {
    const { storeName, phoneNumber, address } = this.state;
    const { signUp } = this.props;
    if (!isSubmitting) {
      if (storeName) {
        this.setState({
          isSubmitting: true,
        });

        console.log( this.props.userInfo)
        console.log( this.props.businessInfo)
        // const loginResult = await signUp(username, password);
        // if (!loginResult) {
        //   this.setState({ isSubmitting: false });
        // }  
        
      } else {
      }
    }
  };
}

export default Container;
