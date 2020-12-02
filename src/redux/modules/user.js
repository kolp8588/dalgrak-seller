// Imports

import { sellerApp, secondaryApp } from "../../firebase";
import firebase from "firebase";

import { Alert, AsyncStorage } from "react-native";

import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Actions

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SET_PROFILE = "SET_PROFILE";
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

function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile,
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
      let response = await sellerApp
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
          return sellerApp.auth().signInWithEmailAndPassword(username, password);
        });
      if (response && response.user) {
        const request = {};
        request.userId = response.user.uid;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          request.token = token;
          
        } else {
          alert('Must use physical device for Push Notifications');
        }
        //ExponentPushToken[iy9JdiG4gSubCuy8si6F2P]
        const isUpdated = await updateProfile(request);
        if (isUpdated) {
          console.log("Getget");
          const profile = await getProfile(response.user.uid)
          console.log("profile");
          if (profile != null) {
            console.log("notnull");
            dispatch(setLogIn(response.user.uid));
            dispatch(setUser(response.user));
            dispatch(setProfile(profile));
            return true;
          }
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
  return async (dispatch) => {
    try {
      const response = await sellerApp
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
      if (response && response.user) {
        request.userId = response.user.uid;
        delete request.userInfo.password;

        if (addProfile(request)) {
          dispatch(setLogIn(response.user.uid));
          dispatch(setUser(response.user));
          dispatch(setProfile(request));
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
    await sellerApp
      .firestore()
      .collection("users")
      .doc(request.userId)
      .set(request);
  } catch (error) {
    console.error("ERROR : ", error.message);
    return false;
  }
  return true;
}

async function updateProfile(request) {
  try {
    await sellerApp
      .firestore()
      .collection("users")
      .doc(request.userId)
      .update(request);
  } catch (error) {
    console.error("ERROR : ", error.message);
    return false;
  }
  return true;
}

async function getProfile(userId) {
  try {
    const collection = await sellerApp
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .get();
    if (collection != null) {
      for (let profile of collection.docs) {     
        const item = profile.data();
        const likes = await secondaryApp
          .firestore()
          .collection("likes")
          .where("userId", "==", userId)
          .get(); 
        const likesData = []
        if (likes != null) {
          for (let like of likes.docs) {
            likesData.push(like.data())
          }  
        }
        console.log("Get Profile Likes!!!");
        console.log(likesData);
        item.id = profile.id;
        item.likes = likesData;
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
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();

    try {
      const result = [];
      const collection = await secondaryApp
        .firestore()
        .collection("messages")
        .where("userId", "==", token)
        .get();
      if (!collection.empty) {
        for (let message of collection.docs) {
          const item = message.data();
          item.id = message.id;
          result.push(item);
        }
      } else {
        console.log("No Messages");
      }
      dispatch(setNotifications(result));
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
      
      const profileData = await getProfile(token)
      if (profileData != null) {
        dispatch(setProfile(profileData));
      }
      return true;

    } catch (error) {
      console.error("ERROR : ", error.message);
      return false;
    }
  };
}

// API Actions
function removeCategory(id) {
  return async (dispatch, getState) => {
    console.log("Remove Category")
    const {
      user: { token },
    } = getState();
    try {
      console.log(token + "+" + id);
      const result = await secondaryApp
        .firestore()
        .collection("likes")
        .doc(token + "+" + id)
        .delete();      
      
      const profileData = await getProfile(token)
      if (profileData != null) {
        dispatch(setProfile(profileData));
      }
      return true;

    } catch (error) {
      console.error("ERROR : ", error.message);
      return false;
    }
  };
}

function getOwnProfile() {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    try {
      const profile = await getProfile(token)
      if (profile != null) {
        dispatch(setProfile(profile));
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
    case SET_PROFILE:
      return applySetProfile(state, action);
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
    user: user,
  };
}

function applySetProfile(state, action) {
  const { profile } = action;
  return {
    ...state,
    profile: profile,
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
  addCategory,
  removeCategory,
  getOwnProfile,
  registerForPush,
};

export { actionCreators };
// Default Reducer Export

export default reducer;
