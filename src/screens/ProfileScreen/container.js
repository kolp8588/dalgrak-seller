import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "../../components/Profile";

class Container extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getOwnProfile: PropTypes.func.isRequired,
  };

  render() {
    const { user, profile, getOwnProfile } = this.props;
    return <Profile user={user} profile={profile} refresh={getOwnProfile} />;
  }
}

export default Container;
