import React, { Component } from "react";
import BiddingScreen from "./presenter";
import * as ImagePicker from "expo-image-picker";

class Container extends Component {
  state = {
    images: [],
    price: 0,
    total: 0,
    comment: "최저가 자신있습니다.",
    info: "",
    isModalVisible: false,
    isSubmitting: false,
  };

  render() {
    return (
      <BiddingScreen
        {...this.state}
        {...this.props}
        submit={this._submit}
        pickImage={this._pickImage}
        onPriceChange={this._onPriceChange}
        onInfoChange={this._onInfoChange}
        onCommentChange={this._onCommentChange}
        onPressSubmit={this._onPressSubmit}
      />
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({
        images: [...this.state.images, result.uri],
      });
    }
  };

  _onPriceChange = (text) => {
    var value = text.split(",").join("");
    this.setState({
      price: value * 1,
      total: value * this.props.route.params.dalgrak.quantity,
    });
  };

  _onInfoChange = (text) => {
    this.setState({
      info: text,
    });
  };

  _onCommentChange = (text) => {
    this.setState({
      comment: text,
    });
  };
  _onPressSubmit = (bool) => {
    this.setState({
      isModalVisible: bool,
    });
  };

  _submit = async () => {
    const { price, total, images, comment, info, isSubmitting } = this.state;
    const {
      route: {
        params: { dalgrak },
      },
      submit,
      submitImages,
    } = this.props;
    if (!isSubmitting) {
      const bidding = {
        price: price,
        total: total,
        comment: comment,
        info: info,
        dalgrakId: dalgrak.id,
      };
      this.setState({
        isSubmitting: true,
      });

      if ((await submitImages(images)) && (await submit(bidding))) {
        this.setState({
          isSubmitting: false,
          isModalVisible: false,
        });
        this.props.navigation.goBack();
        this.props.navigation.goBack();
        this.props.navigation.navigate("Biddings");
      }
    }
  };
}

export default Container;
