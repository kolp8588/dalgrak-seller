import React from "react";
import {Component} from "react";
import Request from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interestId: "",
      isInterest: false
    };
  }
  static propTypes = {};

  componentDidMount() {
    console.log("CHECK :")
    console.log(this.props)
    if (this.props.interestId != undefined) {
      this.setState({
        interestId: this.props.interestId,
        isInterest: true,
      });
    }
  }
  render() {
    return (
      <Request 
        {...this.props} 
        {...this.state}
        submit={this.onSubmit} />
    );
  }

  onSubmit = async () => {
    if (!this.state.isInterest) {
      const { submit } = this.props; 
      const request = {
        dalgrakId : this.props.id
      }   
      const interestId = await submit(request);
      this.setState({
        isInterest: true,
        interestId: interestId
      })
    } else {
      const { remove } = this.props; 
      await remove(this.state.interestId);
      this.setState({
        isInterest: false,
        interestId: ""
      })
    }
  }
}

export default Container;
