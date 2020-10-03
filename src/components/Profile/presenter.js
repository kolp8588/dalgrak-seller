import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

const width = Dimensions.get("window").width;
class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPressOut={this.props.showAS}>
            <Image
              source={require("../../../assets/images/noPhoto.jpg")}
              style={styles.avatar}
              defaultSource={require("../../../assets/images/noPhoto.jpg")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5, backgroundColor: "lightgray" }}></View>
      </View>
    );
  }
}
Profile.propTypes = {};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "space-between",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  headerColumn: {
    width: width / 2,
  },
  profileNumbers: {
    flexDirection: "row",
    marginBottom: 7,
    justifyContent: "space-between",
  },
  headerText: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  name: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 13,
  },
  bio: {
    marginBottom: 5,
  },
  website: {
    color: "#003569",
  },
  modeBar: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "#bbb",
    borderWidth: StyleSheet.hairlineWidth,
  },
  modeIcon: {
    width: width / 2,
    alignItems: "center",
  },
  button: {
    borderRadius: 3,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  photoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Profile;
