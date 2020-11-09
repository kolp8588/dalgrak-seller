import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import SignUpBusinessInfoScreen from "./presenter";
import { MESSAGES } from "../../constants"


class Container extends Component {
  state = {
    businessId: "",
    businessIdErrorMsg: "",
    registrationImage: null,
    phoneNumber: "",
    phoneNumberErrorMsg: "",
    isComplete: false,
  };
  static propTypes = {
  };

  componentDidUpdate = () => {
    const { 
      businessId, 
      businessIdErrorMsg,
      phoneNumber, 
      phoneNumberErrorMsg,
      isComplete,
    } = this.state;

    let newStatus = false
    if (businessId && phoneNumber
      && businessIdErrorMsg == "" && phoneNumberErrorMsg == "") {
      newStatus = true
    }
    if (isComplete != newStatus) {
      this.setState({isComplete: newStatus})
    }
  }
  render() {
    return (
      <SignUpBusinessInfoScreen
        {...this.state}
        changeBusinessId={this._changeBusinessId}
        changeRegistrationImage={this._changeRegistrationImage}
        changePhoneNumber={this._changePhoneNumber}
        goBack={this._goBack}
        submit={this._submit}
      />
    );
  }
  _changeBusinessId = (text) => {    
    let error = ""
    if (text.length != 10) {
      error = MESSAGES.BUSINESS_ID_ERROR
    }
    this.setState({ 
      businessId: text.replace(/[^0-9-_]/g, ''),
      businessIdErrorMsg: error,
    });
  };
  _changeRegistrationImage = (text) => {
    this.setState({ password: text });
  };
  _changePhoneNumber = (text) => {
    let error = ""
    if (!(text.length == 10 || text.length == 11)) {
      error = MESSAGES.PHONE_NUMBER_ERROR
    }
    this.setState({ 
      phoneNumber: text.replace(/[^0-9]/g, ''),
      phoneNumberErrorMsg: error,
    });
  };
  _goBack = () => {
    this.props.navigation.navigate("SignUp");
  };
  _submit = () => {
    const { businessId, registrationImage, phoneNumber } = this.state;
      if (businessId && phoneNumber) {
        let businessInfo = {
          businessId: businessId,
          registrationImage: registrationImage,
          phoneNumber: phoneNumber,
        }
        this.props.navigation.navigate("StoreInfo", {
          userInfo: this.props.route.params.userInfo,
          businessInfo: businessInfo,
        })
      } else {
        Alert.alert("필수 정보를 입력해주세요.");
      }
  };
}

export default Container;
