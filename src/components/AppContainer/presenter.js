import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, StatusBar } from "react-native";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";
import RootNavigation from "../../navigation/RootNavigation";

import { COLORS } from "../../constants";
class AppContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    initApp: PropTypes.func.isRequired,
  };
  componentDidMount() {
    const { initApp } = this.props;
  }

  render() {
    const { isLoggedIn, user } = this.props;
    return (
      <Fragment>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <View style={styles.container}>
          {isLoggedIn && user ? (
            <RootNavigation screenProps={{ username: user.username }} />
          ) : (
            <LoggedOutNavigation />
          )}
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AppContainer;
