import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "../../components/Profile";
import { Text, View, StyleSheet } from "react-native";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
    };
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (!this.props.route.params) {
      this._pickCategory();
    } else {
      
    }
  }

  componentDidUpdate = () => {
    console.log("Hello?")
    if (!this.state.category) {
      this.setState({
        category: this.props.route.params.category,
      });
    }
  }

  render() {
    const { user, profile } = this.props;
    const { category } = this.state;
    console.log("Render")
    console.log(category)
    return (
      <View style={styles.container}>
        {category && (
          <View>
            <Text>{category.name}</Text>
          </View>)
        }
        <Text>Hello!</Text> 
      </View>
    )
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

      this.props.navigation.navigate("UploadCategory", {
        categories: result,
      });
    }
  };
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "white" 
  },
});

export default Container;
