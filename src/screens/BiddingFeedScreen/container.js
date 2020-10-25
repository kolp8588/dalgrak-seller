import React, { Component } from "react";
import PropTypes from "prop-types";
import BiddingFeedScreen from "./presenter";

class Container extends Component {
  static propTypes = {
    biddings: PropTypes.array,
    getBiddings: PropTypes.func.isRequired,
  };
  state = {
    isFetching: false,
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.biddings) {
      this.setState({
        isFetching: false,
      });
    }
  };

  componentDidMount = () => {
    const { getBiddings } = this.props;
    const res = getBiddings();
  };

  render() {
    return (
      <BiddingFeedScreen
        {...this.props}
        {...this.state}
        refresh={this._refresh}
      />
    );
  }
  _refresh = () => {
    const { getBiddings } = this.props;
    this.setState({
      isFetching: true,
    });
    getBiddings();
  };
}

export default Container;
