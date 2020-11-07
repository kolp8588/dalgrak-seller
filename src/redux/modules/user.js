// Imports

import { Alert, AsyncStorage } from "react-native";
import { Permissions, Notifications } from "expo";
import firebase from "firebase";

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
      const response = await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
          return firebase.auth().signInWithEmailAndPassword(username, password);
        });
      if (response && response.user) {
        dispatch(setLogIn(response.user.uid));
        dispatch(setUser(response.user));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
}

function signUp(username, password) {
  return async (dispatch) => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
      if (response && response.user) {
        dispatch(setLogIn(response.user.uid));
        dispatch(setUser(response.user));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      let errorCode = error.code;
      if (errorCode == 'auth/invalid-email') {
        console.log("Email을 확인해 주세요")
        Alert.alert("Email을 확인하세요.");
      } else if (errorCode == 'auth/weak-password') {
        console.log("비밀번호를 확인해 주세요(6자리 이상)")
        Alert.alert("비밀번호를 확인하세요(6자리 이상");
      }
      return false;
    }
  };
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
  return (dispatch, getState) => {
    const {
      user: {
        token,
        profile: { username },
      },
    } = getState();
    fetch(`${API_URL}/users/${username}/`, {
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
      .then((json) => dispatch(setUser(json)));
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
