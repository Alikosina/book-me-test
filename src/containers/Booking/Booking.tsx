import * as React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { DAYS_OF_THE_WEEK } from "../Main/MainContainerModel";
import classnames from "classnames";
import "./Booking.scss";

const HOURS = [
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00"
];

const getNumberFromTimeString = (str: string) => +str.split(":")[0];

class BookingContainer extends React.Component<
  any,
  {
    hours: any[];
    authorId: string;
    selectedBookingTimes: any;
  }
> {
  constructor(props: any) {
    super(props);
    const bookingtimes = props.bookingtimes;
    const { authorId } = this.props.match.params;
    const selectedBookingTimes =
      bookingtimes && bookingtimes.find((b: any) => b.authorUid === authorId);
    const hours = this.getBookingHours(selectedBookingTimes);
    this.state = {
      hours,
      authorId,
      selectedBookingTimes
    };
  }

  getBookingHours = (selectedBookingTimes: any) => {
    if (!selectedBookingTimes) return HOURS;
    const fromHours = DAYS_OF_THE_WEEK.map(day =>
      getNumberFromTimeString(selectedBookingTimes[day].timeFrom)
    );
    const minHour = Math.min(...fromHours);
    const nextHours = HOURS.filter(h => minHour <= getNumberFromTimeString(h));

    return nextHours;
  };

  shouldComponentUpdate(nextProps: any) {
    if (!this.props.bookingtimes && !!nextProps.bookingtimes) {
      const selectedBookingTimes = nextProps.bookingtimes.find(
        (b: any) => b.authorUid === this.state.authorId
      );
      this.setState({
        hours: this.getBookingHours(selectedBookingTimes),
        selectedBookingTimes
      });
    }
    return true;
  }
  render() {
    const { hours, selectedBookingTimes } = this.state;

    return (
      <div className="Booking">
        {DAYS_OF_THE_WEEK.map(day => (
          <div className="Booking__item">
            <h2 className="Booking__item__title">{day}</h2>
            {hours.map(hour => {
              const isDisabled =
                selectedBookingTimes &&
                (getNumberFromTimeString(selectedBookingTimes[day].timeFrom) >
                  getNumberFromTimeString(hour) ||
                  getNumberFromTimeString(selectedBookingTimes[day].timeTo) <
                    getNumberFromTimeString(hour));
              return (
                <div className="Booking__item__hour">
                  <span
                    className={classnames("Booking__item__hour__label", {
                      Booking__item__hour__label_disable: isDisabled,
                      Booking__item__hour__label_active: !isDisabled
                    })}
                  >
                    {hour}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  bookingtimes: state.fireStore.ordered.bookingtimes
});

export const Booking = compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "bookingtimes"
    }
  ])
  // @ts-ignore
)(BookingContainer);
