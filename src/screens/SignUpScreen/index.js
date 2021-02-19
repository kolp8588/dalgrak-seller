import { connect } from "react-redux";
import Container from "./container";

import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    emailDupCheck: (email) => {
      return dispatch(userActions.emailDupCheck(email));
    },
    usernameDupCheck: (username) => {
      return dispatch(userActions.usernameDupCheck(username));
    },
  };
};

export default connect(null, mapDispatchToProps)(Container);
