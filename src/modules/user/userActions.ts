export const getUserInfo = (id: number) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const fireStore = getFirestore();
    console.log("fireStore = ", fireStore);
    dispatch({
      type: "GET_USER_INFO",
      payload: id
    });
  };
};
