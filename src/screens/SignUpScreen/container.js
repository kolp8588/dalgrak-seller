import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import SignUpScreen from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: "",
    passwordCheck: "",
    isSubmitting: false,
  };
  static propTypes = {
    signUp: PropTypes.func.isRequired,
  };
  render() {
    return (
      <SignUpScreen
        {...this.state}
        changeUsername={this._changeUsername}
        changePassword={this._changePassword}
        changePasswordCheck={this._changePasswordCheck}
        submit={this._submit}
      />
    );
  }
  _changeUsername = (text) => {
    this.setState({ username: text });
  };
  _changePassword = (text) => {
    this.setState({ password: text });
  };
  _changePasswordCheck = (text) => {
    this.setState({ passwordCheck: text });
  };
  _submit = async () => {
    const { username, password, passwordCheck, isSubmitting } = this.state;
    const { signUp } = this.props;
    if (!isSubmitting) {
      if (username && password && passwordCheck) {
        if( password != passwordCheck ) {
          Alert.alert("비밀번호를 확인하세요.");
        } else {
          this.setState({
            isSubmitting: true,
          });
          const loginResult = await signUp(username, password);
          if (!loginResult) {
            Alert.alert("Something went wrong, try again");
            this.setState({ isSubmitting: false });
          }  
        }
        
      } else {
        Alert.alert("All fields are required");
      }
    }
  };
}

export default Container;
