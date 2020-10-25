import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dalgrakActions } from "../../redux/modules/dalgrak";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submit: (bidding) => {
      return dispatch(dalgrakActions.submitBidding(bidding));
    },
    submitImages: (images) => {
      return dispatch(dalgrakActions.submitBiddingImages(images));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
