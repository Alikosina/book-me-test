import { authReducer } from "./auth/authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

export const rootReducer = combineReducers({
  auth: authReducer,
  fireStore: firestoreReducer,
  firebase: firebaseReducer
});
