const initState: any = {
  saveError: null,
  bookingTime: {}
};

export const bookingTimeReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case "SAVE_BOOKING_TIME_ERROR":
      return {
        ...state,
        saveError: "Errorr!!!"
      };
    case "SAVE_BOOKING_TIME_SUCCESS":
      return {
        ...state,
        saveError: null
      };
  }
  return state;
};
