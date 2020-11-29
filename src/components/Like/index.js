import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeCategory: (id) => {
      dispatch(userActions.removeCategory(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Container);
