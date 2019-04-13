import { CREATE_USER } from "./actionsConst";

export interface UserInfoModel {
  firstName: string;
  lastName: string;
}

export const createUser = (userInfo: UserInfoModel) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const fireStore = getFirestore();
    fireStore
      .collection("users")
      .add({
        ...userInfo,
        createdAt: new Date()
      })
      .then(() => {
        console.log("SUCCEEEEED!!!");
      });
    dispatch({
      type: CREATE_USER
    });
  };
};
