import { connect } from "react-redux";
import AppContainer from "./presenter";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as dalgrakActions } from "../../redux/modules/dalgrak";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {
    isLoggedIn: user.isLoggedIn,
    profile: user.profile,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initApp: () => {
      dispatch(dalgrakActions.refreshStates());
      // dispatch(userActions.getNotifications());
      // dispatch(userActions.getOwnProfile());
      // dispatch(userActions.registerForPush());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
