import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as dalgrakActions } from "../../redux/modules/dalgrak";

const mapStateToProps = (state, ownProps) => {
  const {
    dalgraks: { interests },
  } = state;
  return {
    interests,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFeed: () => {
      dispatch(dalgrakActions.getFeed());
    },
    initApp: () => {
      dispatch(dalgrakActions.getFeed());
      dispatch(userActions.getNotifications());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
