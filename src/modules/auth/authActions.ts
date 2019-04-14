import { SignInContainerModel } from "../../containers/SignIn/SignInContainerModel";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from "./authActionsConst";

export const signIn = (signInData: SignInContainerModel.State) => {
  return (dispatch: any, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(signInData.email, signInData.password)
      .then(() => {
        dispatch({ type: SIGN_IN_SUCCESS });
      })
      .catch(() => {
        dispatch({ type: SIGN_IN_ERROR });
      });
  };
};

export const signOut = () => {
  return (dispatch: any, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();
    const state = getState();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: SIGNOUT_SUCCESS
        });
      });
  };
};

export const signUp = (newUser: any) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp: any) => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]
          })
          .then(() => {
            dispatch({
              type: SIGNUP_SUCCESS
            });
          })
          .catch(() => {
            dispatch({ type: SIGNUP_ERROR, payload: "SignUp Error!!" });
          });
      });
  };
};
