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
    console.log("WillRecv")
    console.log(this.props.notifications)
    if (nextProps.notifications) {
      this.setState({
        isFetching: false,
      });
    }
  };

  componentDidMount = () => {
    console.log("Mount")
    console.log(this.props.notifications)
    Notifications.setBadgeCountAsync(0);
  };

  render() {
    return (
      <EventsScreen {...this.props} {...this.state} refresh={this._refresh} />
    );
  }
  _refresh = () => {
    const { getNotifications } = this.props;
    this.setState({
      isFetching: true,
    });
    getNotifications();
  };
}

export default Container;
