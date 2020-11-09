import React, { Component } from "react";
import { Alert } from "react-native";
import SignUpScreen from "./presenter";
import { MESSAGES } from "../../constants"

class Container extends Component {
  state = {
    username: "",
    usernameErrorMsg: "",
    email: "",
    emailErrorMsg: "",
    password: "",
    passwordErrorMsg: "",
    passwordCheck: "",
    passwordCheckErrorMsg: "",
    isComplete: false,
  };

  static propTypes = {
  };
  render() {
    return (
      <SignUpScreen
        {...this.state}
        changeUsername={this._changeUsername}
        changeEmail={this._changeEmail}
        changePassword={this._changePassword}
        changePasswordCheck={this._changePasswordCheck}
        goBack={this._goBack}
        submit={this._submit}
      />
    );
  }
  componentDidUpdate = () => {
    const { 
      username, 
      usernameErrorMsg,
      email, 
      emailErrorMsg,
      password, 
      passwordErrorMsg,
      passwordCheck,
      passwordCheckErrorMsg,
      isComplete,
    } = this.state;

    let newStatus = false
    if (username && email && password && passwordCheck
      && usernameErrorMsg == "" && emailErrorMsg == ""
      && passwordErrorMsg == "" && passwordCheckErrorMsg == "") {
      newStatus = true
    }
    if (isComplete != newStatus) {
      this.setState({isComplete: newStatus})
    }
  }
  _changeUsername = (text) => {
    this.setState({ username: text });
  };
  _changeEmail = (text) => {
    let regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    let emailError = ""
    if (!regex.test(text)) {
      emailError = MESSAGES.EMAIL_ERROR
    }
    this.setState({ email: text, emailErrorMsg: emailError});
  };
  _changePassword = (text) => {
    let regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z`~!@#$%^&*()-_+=]{8,16}$/; 
    let passwordError = ""
    if (!regex.test(text)) {
      passwordError = MESSAGES.PASSWORD_ERROR
    }
    this.setState({ password: text, passwordCheck: "", passwordErrorMsg: passwordError });
  };
  _changePasswordCheck = (text) => {
    let passwordCheckError = ""
    if (this.state.password != text) {
      passwordCheckError = MESSAGES.PASSWORD_CHECK_ERROR
    }
    this.setState({ passwordCheck: text, passwordCheckErrorMsg: passwordCheckError });
  };
  _goBack = () => {
    this.props.navigation.goBack();
  };
  _submit = () => {
    const { isComplete, username, email, password } = this.state;
    if (isComplete) {
      let userInfo = {
        username: username,
        email: email,
        password: password,
      }
      this.props.navigation.navigate("BusinessInfo", {userInfo: userInfo})
    }
  };
}

export default Container;
