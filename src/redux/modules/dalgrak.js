// Imports
import { sellerApp, secondaryApp } from "../../firebase";
import "firebase/firestore";
import { actionCreators as userActions } from "./user";

// Actions

const SET_CATEGORY = "SET_CATEGORY";
const REFRESH_STATES = "REFRESH_STATES";
const SET_FEED = "SET_FEED";

// Action Creators

function setCategory(category) {
  return {
    type: SET_CATEGORY,
    category,
  };
}
function refreshStates() {
  return {
    type: REFRESH_STATES,
  };
}

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed,
  };
}

// API Actions
function getFeed() {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    try {
      const result = [];
      const collection = await secondaryApp
        .firestore()
        .collection("dalgraks")
        .get();
      if (!collection.empty) {
        for (let dalgrak of collection.docs) {
          const item = dalgrak.data();
          item.id = dalgrak.id;
          result.push(item);
        }
      } else {
        console.log("NO DATA");
      }
      dispatch(setFeed(result));
    } catch (error) {
      console.error("ERROR : ", error.message);
    }
  };
}
function getCategories(parent) {
  return async (dispatch) => {
    if (parent.depth === 2 && parent.name !== "") {
      dispatch(setCategory(parent));
      return null;
    }
    const result = [];
    try {
      const collection = await firebase
        .firestore()
        .collection("categories")
        .where("parent", "==", parent.name)
        .get();

      if (!collection.empty) {
        for (let category of collection.docs) {
          const item = category.data();
          try {
            item.imageUrl = await firebase
              .storage()
              .ref(item.imageRef)
              .getDownloadURL();
          } catch {
            console.log("NO_IMAGE_URL");
          }
          item.id = category.id;
          result.push(item);
        }
        return result;
      } else {
        console.log("NO DATA");
        return null;
      }
    } catch (error) {
      console.error("ERROR : ", error.message);
      return null;
    }
  };
}
function submitDalgrak(dalgrak) {
  return async (dispatch, getState) => {
    const {
      dalgraks: { category },
      user: { token },
    } = getState();
    dalgrak.userId = token;
    dalgrak.category = category.name;
    dalgrak.imageUrl = category.imageUrl;
    dalgrak.participants = 0;
    const response = await firebase
      .firestore()
      .collection("dalgraks")
      .add(dalgrak);
    if (response) {
      dispatch(getFeed());
      return true;
    } else {
      return false;
    }
  };
}
// Initial State

const initialState = {};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return applySetFeed(state, action);
    case SET_CATEGORY:
      return applySetCategory(state, action);
    case REFRESH_STATES:
      return applyRefreshStates(state);
    default:
      return state;
  }
}

// Reducer Actions
function applySetFeed(state, action) {
  const { feed } = action;
  return {
    ...state,
    feed,
  };
}

function applySetCategory(state, action) {
  const { category } = action;
  return {
    ...state,
    category,
  };
}

function applyRefreshStates(state) {
  return {
    feed: state.feed,
  };
}

// Exports

const actionCreators = {
  getFeed,
  getCategories,
  refreshStates,
  submitDalgrak,
};

export { actionCreators };

// Default Reducer Export

export default reducer;
