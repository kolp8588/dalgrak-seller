import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dalgrakActions } from "../../redux/modules/dalgrak";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancel: (id) => {
      return dispatch(dalgrakActions.removeBidding(id));
    },
    submit: (id) => {
      return dispatch(dalgrakActions.updateBidding(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
