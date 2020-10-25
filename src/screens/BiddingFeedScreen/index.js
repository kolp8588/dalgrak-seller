import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dalgrakActions } from "../../redux/modules/dalgrak";

const mapStateToProps = (state, ownProps) => {
  const {
    dalgraks: { biddings },
  } = state;
  return {
    biddings,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBiddings: () => {
      dispatch(dalgrakActions.getBiddings());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
