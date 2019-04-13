import { userReducer } from "./user/userReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  user: userReducer
});
