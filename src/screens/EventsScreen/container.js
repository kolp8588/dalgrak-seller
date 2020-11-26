import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Notifications from 'expo-notifications';
import EventsScreen from "./presenter";

class Container extends Component {
  static propTypes = {
    notifications: PropTypes.array,
    getNotifications: PropTypes.func.isRequired
  };
  state = {
    isFetching: false,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.notifications) {
      this.setState({
        isFetching: false,
      });
    }
  };

  componentDidMount = () => {
    Notifications.setBadgeCountAsync(0);
  };

  render() {
    return (
      <EventsScreen
        {...this.props}
        {...this.state} 
        refresh={this._refresh} 
        setEventOption={this._setEventOption}
      />
    );
  }
  _refresh = () => {
    const { getNotifications } = this.props;
    this.setState({
      isFetching: true,
    });
    getNotifications();
  };

  _setEventOption = () => {
    this.props.navigation.navigate("EventOption");
  };
}

export default Container;
