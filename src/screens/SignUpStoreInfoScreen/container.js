import React, { Component } from "react";
import SignUpStoreInfoScreen from "./presenter";
import { MESSAGES } from "../../constants"
import { Alert } from "react-native";

class Container extends Component {
  state = {
    storeName: "",
    storeNameErrorMsg: "",
    phoneNumber: "",
    phoneNumberErrorMsg: "",
    address: "",
    addressErrorMsg: "",
    detailAddress: "",
    detailAddressErrorMsg: "",
    categories: [],
    isComplete: false,
    isSubmitting: false,
    isModalVisible: false,
  };

  componentDidUpdate = () => {
    const { 
      storeName, 
      storeNameErrorMsg,
      phoneNumber, 
      phoneNumberErrorMsg,
      address, 
      addressErrorMsg,
      detailAddress, 
      detailAddressErrorMsg,
      isComplete,
    } = this.state;

    let newStatus = false
    if (storeName && phoneNumber && address && detailAddress
      && storeNameErrorMsg == "" && phoneNumberErrorMsg == "" 
      && addressErrorMsg == "" && detailAddressErrorMsg == "") {
      newStatus = true
    }
    if (isComplete != newStatus) {
      this.setState({isComplete: newStatus})
    }
  }

  render() {
    return (
      <SignUpStoreInfoScreen
        {...this.state}
        changeStoreName={this._changeStoreName}
        changePhoneNumber={this._changePhoneNumber}
        onChangeModalVisibility={this._onChangeModalVisibility}
        selectAddress={this._selectAddress}
        changeDetailAddress={this._changeDetailAddress}
        goBack={this._goBack}
        submit={this._submit}
      />
    );
  }
  _changeStoreName = (text) => {
    this.setState({ storeName: text });
  };
  _changePhoneNumber = (text) => {
    let error = ""
    if (!(text.length >= 9 && text.length <= 11)) {
      error = MESSAGES.PHONE_NUMBER_ERROR
    }
    this.setState({ 
      phoneNumber: text.replace(/[^0-9]/g, ''),
      phoneNumberErrorMsg: error,
    });
  };
  _selectAddress = (result) => {
    this.setState({
      address: result.address,
      isModalVisible: false,
    });
  };
  _changeDetailAddress = (text) => {
    this.setState({ detailAddress: text });
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
    const {userInfo, businessInfo} = this.props.route.params;
    const { storeName, phoneNumber, address, isSubmitting } = this.state;
    const storeInfo = {
      storeName: storeName,
      phoneNumber: phoneNumber,
      address: address
    }
    const { signUp } = this.props;
    if (!isSubmitting) {
      if (storeName) {
        this.setState({
          isSubmitting: true,
        });
        const request = {
          userInfo: userInfo,
          businessInfo: businessInfo,
          storeInfo: storeInfo
        }
        const result = await signUp(request);
        if (!result) {
          this.setState({ isSubmitting: false });
        } else {
          Alert.alert("달그락 입점을 축하드립니다!");
          this.props.navigation.navigate("LogIn");
        }
      } 
    }
  };
}

export default Container;
