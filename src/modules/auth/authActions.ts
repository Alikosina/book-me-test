export const signIn = (signInData: any) => {
  return (dispatch: any, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(signInData.email, signInData.password)
      .then(() => {
        dispatch({ type: "SIGN_IN_SUCCESS" });
      })
      .catch(() => {
        dispatch({ type: "SIGN_IN_ERROR" });
      });
  };
};
