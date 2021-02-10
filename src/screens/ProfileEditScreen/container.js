import React, { Component } from "react";

import ProfileEditScreen from "./presenter";

class Container extends Component {
  state = {
    setPassword:false,
    phoneNumber:"",
    username:this.props.profile.userInfo.username,
    password:""
  };

  render() {
    return (
      <ProfileEditScreen
        {...this.state}
        {...this.props}
        editPassword={this._editPassword}
        profileSubmit={this._profileSubmit}
        changeUsername={this._changeUsername}
      />
    );
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.profile) {
      this.setState({
        isFetching: false,
      });
    }
  };
  
  _editPassword = (text) => {
    this.setState({
      setPassword: true,
    });
  };

  _changeUsername = (text) => {
    this.setState({
      username: text,
    });
  };

  _profileSubmit = async () => {

    const { profile, submitProfile } = this.props;
    const { username } = this.state;

    profile.username = username;

    const uploadResult = await submitProfile(profile);
    if (uploadResult) {
      this.props.navigation.goBack();
    }
  };
}



export default Container;
