import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUp: (username, password) => {
      return dispatch(userActions.signUp(username, password));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);
