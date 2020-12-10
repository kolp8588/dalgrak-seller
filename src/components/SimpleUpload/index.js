import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeSimpleUpload: (id) => {
      dispatch(userActions.removeSimpleUpload(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Container);
