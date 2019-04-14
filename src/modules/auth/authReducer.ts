import { AuthModel } from "./authModel";
import {
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from "./authActionsConst";

const initState: AuthModel.InitState = {
  authError: null
};

export const authReducer = (
  state: AuthModel.InitState = initState,
  action: any
) => {
  switch (action.type) {
    case SIGN_IN_ERROR:
      return {
        ...state,
        authError: "Error"
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authError: null
      };
    case SIGNOUT_SUCCESS:
      console.log("signout success");
      return state;
    case SIGNUP_SUCCESS:
      console.log("signup success!!!");
      return {
        ...state,
        authError: null
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        authError: "Errror!"
      };
  }
  return state;
};
