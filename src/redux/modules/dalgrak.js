// Imports
import { sellerApp, secondaryApp } from "../../firebase";
import "firebase/firestore";
import { actionCreators as userActions } from "./user";

// Actions

const SET_CATEGORY = "SET_CATEGORY";
const REFRESH_STATES = "REFRESH_STATES";
const SET_FEED = "SET_FEED";
const SET_BIDDINGS = "SET_BIDDINGS";

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

function setBiddings(biddings) {
  return {
    type: SET_BIDDINGS,
    biddings,
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

// API Actions
async function getDalgrak(id) {
  try {
    const dalgrak = await secondaryApp
      .firestore()
      .collection("dalgraks")
      .doc(id)
      .get();
    if (dalgrak != null) {
      const item = dalgrak.data();
      return item;
    } else {
      console.log("NO DATA");
    }
  } catch (error) {
    console.error("ERROR : ", error.message);
  }
  return null;
}

// API Actions
function getBiddings() {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    try {
      const result = [];
      const collection = await secondaryApp
        .firestore()
        .collection("biddings")
        .where("userId", "==", token)
        .get();
      if (!collection.empty) {
        for (let bidding of collection.docs) {
          const item = bidding.data();
          item.id = bidding.id;
          const dalgrak = await getDalgrak(item.dalgrakId);
          item.dalgrak = dalgrak;

          result.push(item);
        }
      } else {
        console.log("No Biddings");
      }
      dispatch(setBiddings(result));
    } catch (error) {
      console.error("ERROR : ", error.message);
    }
  };
}

// API Actions
function addCategory(category) {
  return async (dispatch, getState) => {
    const {
      user: { token, profile },
    } = getState();
    try {
      const request = {
        ...category,
        userId: token,
        token: profile.token,
      }
      await secondaryApp
        .firestore()
        .collection("likes")
        .doc(token + "+" + request.id)
        .set(request);
      
      await userActions.getOwnProfile(token);
      return true;

    } catch (error) {
      console.error("ERROR : ", error.message);
      return false;
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
      const collection = await secondaryApp
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

function submitBidding(bidding) {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    bidding.userId = token;
    const response = await secondaryApp
      .firestore()
      .collection("biddings")
      .add(bidding);
    if (response) {
      dispatch(getBiddings());
      return true;
    } else {
      return false;
    }
  };
}

function submitBiddingImages(images) {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    var isSuccess = true;
    for (var i = 0; i < images.length; i++) {
      var res = await fetch(images[i]);
      var blob = await res.blob();

      var image = images[i].split("/");
      var imageName = image[image.length - 1];

      const response = await secondaryApp
        .storage()
        .ref()
        .child(`images/biddings/${token}/${imageName}`)
        .put(blob);
      if (!response) {
        isSuccess = false;
      }
    }

    return isSuccess;
  };
}

// Initial State

const initialState = {};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return applySetFeed(state, action);
    case SET_BIDDINGS:
      return applySetBiddings(state, action);
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

function applySetBiddings(state, action) {
  const { biddings } = action;
  return {
    ...state,
    biddings,
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
  getBiddings,
  getCategories,
  addCategory,
  refreshStates,
  submitBidding,
  submitBiddingImages,
};

export { actionCreators };

// Default Reducer Export

export default reducer;
