import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dalgrakActions } from "../../redux/modules/dalgrak";
import { actionCreators as userActions } from "../../redux/modules/user";
const mapStateToProps = (state, ownProps) => {
  const {
    dalgraks: { category },
  } = state;

  return {
    category,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCategories: (parent) => {
      return dispatch(dalgrakActions.getCategories(parent));
    },
    addCategory: (category) => {
      return dispatch(userActions.addCategory(category));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
