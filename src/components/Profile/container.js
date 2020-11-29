import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import Profile from "./presenter";
import ActionSheet from "react-native-actionsheet";

const options = ["Cancel", "Log Out"];
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class Container extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
  };
  state = {
    isFetching: true,
  };
  componentDidMount = () => {
    const { profile, user } = this.props;
    if (profile && user) {
      this.setState({
        isFetching: false,
      });
    }
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.profile) {
      this.setState({
        isFetching: false,
      });
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor:"blue" }}>
        <Profile
          {...this.props}
          {...this.state}          
          showAS={this._showActionSheet}          
        />
        <ActionSheet
          ref={(actionSheet) => (this.actionSheet = actionSheet)}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this._handleSheetPress}
        />
      </View>
    );
  }
  
  _showActionSheet = () => {
    this.actionSheet.show();
  };
  _handleSheetPress = (index) => {
    const { logOut } = this.props;
    if (index === 1) {
      logOut();
    }
  };
  
}

export default Container;
