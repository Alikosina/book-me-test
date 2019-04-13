import { AuthModel } from "./authModel";

const initState: AuthModel.InitState = {
  authError: null
};

export const authReducer = (
  state: AuthModel.InitState = initState,
  action: any
) => {
  switch (action.type) {
    case "SIGN_IN_ERROR":
      return {
        ...state,
        authError: "Error"
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        authError: null
      };
  }
  return state;
};
