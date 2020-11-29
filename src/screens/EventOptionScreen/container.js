import React, { Component } from "react";
import PropTypes from "prop-types";
import EventOptionScreen from "./presenter";

class Container extends Component {
  static propTypes = {
    profile: PropTypes.object,
    isAlarmStop: PropTypes.bool,
    isAlarmStopAtNight: PropTypes.bool,
  };
  state = {
    isFetching: false,
    isAlarmStop: false,
    isAlarmStopAtNight: false,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.profile) {
      this.setState({
        isFetching: false,
      });
    }
  };

  componentDidMount = () => {
    const { getOwnProfile } = this.props;
    getOwnProfile();
  };

  render() {
    console.log(this.props.likes)
    return (
      <EventOptionScreen {...this.props} {...this.state} pickCategory={this._pickCategory} />
    );
  }
  _onChangAlarm = (test) => {
    
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
