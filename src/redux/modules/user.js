// Imports

import { sellerApp, secondaryApp } from "../../firebase";
import firebase from "firebase";

import { Alert, AsyncStorage } from "react-native";
import { Permissions, Notifications } from "expo";

// Actions

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

// Action Creators

function setLogIn(token) {
  return {
    type: LOG_IN,
    token,
  };
}

function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

function logOut() {
  return { type: LOG_OUT };
}

function setNotifications(notifications) {
  return {
    type: SET_NOTIFICATIONS,
    notifications,
  };
}

// API Actions

function login(username, password) {
  return async (dispatch) => {
    try {
      const response = await sellerApp
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
          return sellerApp.auth().signInWithEmailAndPassword(username, password);
        });
      if (response && response.user) {
        const profile = await getProfile(response.user.uid)
        if (profile != null) {
          response.user.profile = profile;
          dispatch(setLogIn(response.user.uid));
          dispatch(setUser(response.user));
          return true;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    return false;
  };
}

function signUp(request) {
  const {userInfo, businessInfo, storeInfo} = request
  console.log(userInfo)
  return async (dispatch) => {
    try {
      const response = await sellerApp
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      if (response && response.user) {
        request.userId = response.user.uid;
        delete request.userInfo.password;
        if (addProfile(request)) {
          response.user.profile = request;
          dispatch(setLogIn(response.user.uid));
          dispatch(setUser(response.user));
          return true;
        }
      } 
    } catch (error) {
      let errorCode = error.code;
      if (errorCode == 'auth/invalid-email') {
        console.log("Email을 확인해 주세요")
        Alert.alert("Email을 확인하세요.");
      } else if (errorCode == 'auth/weak-password') {
        console.log("비밀번호를 확인해 주세요(6자리 이상)")
        Alert.alert("비밀번호를 확인하세요(6자리 이상");
      } else {
        Alert.alert("에러가 발생했습니다. 다시 시도해 주세요.");
        console.log(error)
      }
    }
    return false;
  };
}
// API Actions
async function addProfile(request) {
  try {
    const response = await sellerApp
      .firestore()
      .collection("users")
      .add(request);
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("ERROR : ", error.message);
  }
  return false;
}

async function getProfile(userId) {
  try {
    console.log(userId)
    const collection = await sellerApp
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .get();
    if (collection != null) {
      for (let profile of collection.docs) {
        const item = profile.data();
        item.id = profile.id;
        return item
      }
    } else {
      console.log("NO DATA");
      return null;
    }
  } catch (error) {
    console.error("ERROR : ", error.message);
  }
  return null;
}

function checkDup(username, password) {
}

function getNotifications() {
  return (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    fetch(`${API_URL}/notifications/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          dispatch(logOut());
        } else {
          return response.json();
        }
      })
      .then((json) => dispatch(setNotifications(json)));
  };
}

function getOwnProfile() {
  return async (dispatch) => {
    try {
      const profile = await getProfile(response.user.uid)
      if (profile != null) {
        console.log("PROFILE : ")
        console.log(profile)
        response.user.profile = profile;
        dispatch(setLogIn(response.user.uid));
        dispatch(setUser(response.user));
        return true;
      }
    } catch (error) {
      console.log(error)
    }
    return false;
  };
}

function registerForPush() {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus === "denied") {
      return;
    }

    let pushToken = await Notifications.getExpoPushTokenAsync();

    return fetch(`${API_URL}/users/push/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        token: pushToken,
      }),
    });
  };
}

// Initial State

const initialState = {
  isLoggedIn: false,
};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return applyLogIn(state, action);
    case LOG_OUT:
      return applyLogOut(state, action);
    case SET_USER:
      return applySetUser(state, action);
    case SET_NOTIFICATIONS:
      return applySetNotifications(state, action);
    default:
      return state;
  }
}

// Reducer Functions

function applyLogIn(state, action) {
  const { token } = action;
  return {
    ...state,
    isLoggedIn: true,
    token,
  };
}

function applyLogOut(state, action) {
  AsyncStorage.clear();
  return {
    ...state,
    isLoggedIn: false,
    token: "",
  };
}

function applySetUser(state, action) {
  const { user } = action;
  return {
    ...state,
    profile: user,
  };
}

function applySetNotifications(state, action) {
  const { notifications } = action;
  return {
    ...state,
    notifications,
  };
}

// Exports

const actionCreators = {
  login,
  signUp,
  logOut,
  getNotifications,
  getOwnProfile,
  registerForPush,
};

export { actionCreators };
// Default Reducer Export

export default reducer;
