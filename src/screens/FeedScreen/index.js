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
    getFeed: () => {
      dispatch(dalgrakActions.getFeed());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
