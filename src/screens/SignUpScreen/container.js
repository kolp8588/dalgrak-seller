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
    isValidEmail: false,
    isValidUsername: false,
    isComplete: false,
  };

  static propTypes = {
  };
  render() {
    return (
      <SignUpScreen
        {...this.state}
        emailDupCheck={this._emailDupCheck}
        usernameDupCheck={this._usernameDupCheck}
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
      isValidEmail,
      isValidUsername,
      isComplete,
    } = this.state;

    let newStatus = false
    if (username && email && password && passwordCheck
      && usernameErrorMsg == MESSAGES.USERNAME_NOT_DUP && emailErrorMsg == MESSAGES.EMAIL_NOT_DUP
      && passwordErrorMsg == "" && passwordCheckErrorMsg == ""
      && isValidUsername && isValidEmail) {
      newStatus = true
    }
    if (isComplete != newStatus) {
      this.setState({isComplete: newStatus})
    }
  }
  _changeUsername = (text) => {
    let regex = /^[가-힣0-9a-zA-Z]{2,10}$/;
    let usernameError = ""
    if (!regex.test(text)) {
      usernameError = MESSAGES.USERNAME_ERROR
    }
    this.setState({ username: text, isValidUsername: false, usernameErrorMsg: usernameError });
  };
  _changeEmail = (text) => {
    let regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    let emailError = ""
    if (!regex.test(text)) {
      emailError = MESSAGES.EMAIL_ERROR
    }
    this.setState({ email: text, isValidEmail: false, emailErrorMsg: emailError});
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
  _emailDupCheck = async () => {
    const { emailDupCheck } = this.props;
    const { email } = this.state;
    if (await emailDupCheck(email)) {
      this.setState({ isValidEmail: true, emailErrorMsg: MESSAGES.EMAIL_NOT_DUP});
    } else {
      this.setState({ isValidEmail: false, emailErrorMsg: MESSAGES.EMAIL_DUP_ERROR});
    }
  };

  _usernameDupCheck = async () => {
    const { usernameDupCheck } = this.props;
    const { username } = this.state;
    if (await usernameDupCheck(username)) {
      this.setState({ isValidUsername: true, usernameErrorMsg: MESSAGES.USERNAME_NOT_DUP });
    } else {
      this.setState({ isValidUsername: false, usernameErrorMsg: MESSAGES.USERNAME_DUP_ERROR});
    }
  };
}

export default Container;
