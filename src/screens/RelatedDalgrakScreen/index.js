import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dalgrakActions } from "../../redux/modules/dalgrak";

const mapStateToProps = (state, ownProps) => {
  const {
    dalgraks: { feed },
  } = state;
  return {
    feed,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submit: (request) => {
      return dispatch(dalgrakActions.removeBidding(request));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
