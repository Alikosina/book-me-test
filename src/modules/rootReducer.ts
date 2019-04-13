import { userReducer } from "./user/userReducer";
import { authReducer } from "./auth/authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  fireStore: firestoreReducer,
  firebase: firebaseReducer
});
