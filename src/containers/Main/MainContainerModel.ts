import { string } from "prop-types";

export namespace MainContainerModel {
  export interface State {
    bookingTime: {
      [keyof: string]: {
        timeFrom: string;
        timeTo: string;
        disabled: boolean;
      };
    };
  }
}

export const DAYS_OF_THE_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
