export const saveBookingTime = (bookingTimeObj: any) => {
  return (dispatch: any, getState: any, { getFirestore }: any) => {
    const firestore = getFirestore();
    const state = getState();
    const { bookingtimes } = state.fireStore.ordered;
    const { uid } = state.firebase.auth;
    const userBookingTime = bookingtimes.find(
      (b: any) => b.authorUid && b.authorUid === uid
    );

    if (!userBookingTime) {
      firestore
        .collection("bookingtimes")
        .add({
          ...bookingTimeObj
        })
        .then(() => {
          dispatch({
            type: "SAVE_BOOKING_TIME_SUCCESS"
          });
        })
        .catch(() => {
          dispatch({
            type: "SAVE_BOOKING_TIME_ERROR"
          });
        });
    } else {
      firestore
        .collection("bookingtimes")
        .doc(userBookingTime.id)
        .set({
          ...userBookingTime,
          ...bookingTimeObj
        });
    }
  };
};
