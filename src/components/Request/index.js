import { connect } from "react-redux";
import Container from "./container";

import { actionCreators as dalgrakActions } from "../../redux/modules/dalgrak";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submit: (request) => {
      return dispatch(dalgrakActions.submitInterest(request));
    },
    remove: (request) => {
      return dispatch(dalgrakActions.removeInterest(request));
    },
  };
};

export default connect(null, mapDispatchToProps)(Container);
