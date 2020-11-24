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
    return <Profile user={user} profile={profile} 
    refresh={getOwnProfile} pickCategory={this._pickCategory} />;
  }

  _pickCategory = async () => {
    const parent = {
      depth: -1,
      name: "root",
    };
    const { getCategories } = this.props;
    const result = await getCategories(parent);
    if (result !== null) {
      const {
        navigation: { navigate },
      } = this.props;

      this.props.navigation.navigate("Category", {
        categories: result,
      });
    }
  };
}

export default Container;
