import * as React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { DAYS_OF_THE_WEEK } from "../Main/MainContainerModel";
import classnames from "classnames";
import "./Booking.scss";
import { BookingForm } from "../../components/BookingForm/BookingForm";
import { reserveTime } from "../../modules/bookingTime/bookingTimeActions";

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
    isFormOpen: boolean;
    selectedDay: string;
    selectedHour: string;
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
      selectedBookingTimes,
      isFormOpen: false,
      selectedDay: "",
      selectedHour: ""
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

  onHourClick = (selectedDay: string, selectedHour: string) => {
    this.setState({
      isFormOpen: true,
      selectedDay,
      selectedHour
    });
  };

  onFormClose = () => {
    this.setState({
      isFormOpen: false
    });
  };

  onSubmit = () => {
    const { reserveTime } = this.props;
    const { selectedDay, selectedHour, selectedBookingTimes } = this.state;
    const selectedBookingTimeDay = selectedBookingTimes[selectedDay];
    const { reservedTimes = [] } = selectedBookingTimeDay;
    const nextReservedTimes = [...reservedTimes, selectedHour];
    const nextSelectedBookingTimes = {
      ...selectedBookingTimes,
      [selectedDay]: {
        ...selectedBookingTimeDay,
        reservedTimes: nextReservedTimes
      }
    };
    reserveTime(nextSelectedBookingTimes);
    this.setState({
      isFormOpen: false,
      selectedBookingTimes: nextSelectedBookingTimes
    });
  };

  render() {
    const { hours, selectedBookingTimes, isFormOpen } = this.state;

    return (
      <React.Fragment>
        <div className="Booking">
          {DAYS_OF_THE_WEEK.map(day => (
            <div className="Booking__item">
              <h2 className="Booking__item__title">{day}</h2>
              {hours.map(hour => {
                const selectedBookingDay =
                  selectedBookingTimes && selectedBookingTimes[day];
                const isOutOfRange =
                  selectedBookingTimes &&
                  (getNumberFromTimeString(selectedBookingDay.timeFrom) >
                    getNumberFromTimeString(hour) ||
                    getNumberFromTimeString(selectedBookingDay.timeTo) <
                      getNumberFromTimeString(hour));
                const isReserved =
                  selectedBookingDay &&
                  selectedBookingDay.reservedTimes &&
                  selectedBookingDay.reservedTimes.includes(hour);
                const isDisabled = isOutOfRange || isReserved;
                return (
                  <div className="Booking__item__hour">
                    <span
                      onClick={
                        !isDisabled && this.onHourClick.bind(this, day, hour)
                      }
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
        <BookingForm
          onSubmit={this.onSubmit}
          onClose={this.onFormClose}
          isOpen={isFormOpen}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  bookingtimes: state.fireStore.ordered.bookingtimes
});

const mapDispatchToProps = (dispatch: any) => ({
  reserveTime: (bookingTimeObj: any) => dispatch(reserveTime(bookingTimeObj))
});

export const Booking = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "bookingtimes"
    }
  ])
  // @ts-ignore
)(BookingContainer);
