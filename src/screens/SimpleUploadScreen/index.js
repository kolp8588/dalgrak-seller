import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as dalgrakActions } from "../../redux/modules/dalgrak";

import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {
    user: user.user,
    profile: user.profile,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCategories: (parent) => {
      return dispatch(dalgrakActions.getCategories(parent));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
