import React, { Component } from "react";
import PropTypes from "prop-types";
import InterestsFeedScreen from "./presenter";

class Container extends Component {
  static propTypes = {
    interests: PropTypes.array,
    getFeed: PropTypes.func.isRequired,
  };
  state = {
    isFetching: false,
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.interests) {
      this.setState({
        isFetching: false,
      });
    }
  };

  componentDidMount = () => {
    const { initApp } = this.props;
    initApp();
  };

  render() {
    return (
      <InterestsFeedScreen {...this.props} {...this.state} refresh={this._refresh} />
    );
  }
  _refresh = () => {
    const { getFeed } = this.props;
    this.setState({
      isFetching: true,
    });
    getFeed();
  };
}

export default Container;
