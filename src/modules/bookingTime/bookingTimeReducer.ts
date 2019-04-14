import {
  SAVE_BOOKING_TIME_ERROR,
  SAVE_BOOKING_TIME_SUCCESS
} from "./bookingTimeActionsConst";
import { BookingTimeModel } from "./bookingTimeModel";

export const bookingTimeReducer = (
  state: BookingTimeModel.State = BookingTimeModel.initState,
  action: any
) => {
  switch (action.type) {
    case SAVE_BOOKING_TIME_ERROR:
      return {
        ...state,
        saveError: "Errorr!!!"
      };
    case SAVE_BOOKING_TIME_SUCCESS:
      return {
        ...state,
        saveError: null
      };
  }
  return state;
};
