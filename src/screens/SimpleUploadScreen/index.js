import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";

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
    submit: (request) => {
      return dispatch(userActions.submitSimpleUpload(request));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
