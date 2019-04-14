export namespace BookingTimeModel {
  export const initState: State = {
    saveError: null,
    bookingTime: {}
  };

  export interface State {
    saveError?: boolean;
    bookingTime: BookingTime;
  }

  export interface BookingTime {
    [keyof: string]: {
      timeFrom: string;
      timeTo: string;
      disabled: boolean;
      authorId: string;
      id: string;
    };
  }
}
