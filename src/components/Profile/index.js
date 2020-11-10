import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { profile },
  } = state;
  return {
    profile,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOut: () => {
      dispatch(userActions.logOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
