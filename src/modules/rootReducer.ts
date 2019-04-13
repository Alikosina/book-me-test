import { userReducer } from "./user/userReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

export const rootReducer = combineReducers({
  user: userReducer,
  fireStore: firestoreReducer
});
