import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as dalgrakActions } from "../../redux/modules/dalgrak";

import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
