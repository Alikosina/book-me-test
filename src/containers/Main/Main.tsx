import * as React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
// @ts-ignore
import TimePicker from "react-time-picker";
import * as moment from "moment";
import "./Main.scss";
import { MainContainerModel } from "./MainContainerModel";
import { saveBookingTime } from "../../modules/bookingTime/bookingTimeActions";

const DAYS_OF_THE_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

class MainContainer extends React.Component<
  {
    auth: any;
    saveBookingTime: any;
    bookingtimes: any;
  },
  MainContainerModel.State
> {
  constructor(props: any) {
    super(props);
    const bookingTime = DAYS_OF_THE_WEEK.reduce((bookingObj, day) => {
      return {
        ...bookingObj,
        [day]: {
          timeFrom: "12:00",
          timeTo: "19:00",
          disabled: false
        }
      };
    }, {});

    this.state = { bookingTime };
  }

  onChangeFrom = (value: string, day: string) => {
    const { bookingTime } = this.state;
    const dayBookingTime = bookingTime[day];
    const updatedDayBookingTime = {
      ...dayBookingTime,
      timeFrom: value
    };
    this.setState({
      bookingTime: {
        ...bookingTime,
        [day]: updatedDayBookingTime
      }
    });
  };

  onChangeTo = (value: string, day: string) => {
    const { bookingTime } = this.state;
    const dayBookingTime = bookingTime[day];
    const updatedDayBookingTime = {
      ...dayBookingTime,
      timeTo: value
    };
    this.setState({
      bookingTime: {
        ...bookingTime,
        [day]: updatedDayBookingTime
      }
    });
  };

  shouldComponentUpdate(nextProps: any) {
    const { bookingtimes, auth } = this.props;
    const { bookingtimes: nextBookingTimes } = nextProps;

    if (
      !bookingtimes &&
      nextBookingTimes &&
      nextBookingTimes.some((b: any) => b.authorUid && b.authorUid === auth.uid)
    ) {
      this.setState({
        bookingTime: nextBookingTimes.find(
          (b: any) => b.authorUid && b.authorUid === auth.uid
        )
      });
    }
    return true;
  }

  saveBookingTime = () => {
    const { auth, saveBookingTime } = this.props;
    const { bookingTime } = this.state;
    saveBookingTime({
      ...bookingTime,
      authorUid: auth.uid
    });
  };

  render() {
    const { auth, bookingtimes } = this.props;
    const { bookingTime } = this.state;

    if (!auth.uid) return <Redirect to="/signin" />;

    const hasBookingTime =
      bookingtimes &&
      bookingtimes.some((b: any) => b.authorUid && b.authorUid === auth.uid);

    return (
      <div className="Main">
        {DAYS_OF_THE_WEEK.map(day => (
          <div key={day} className="BookingTime__item">
            <span className="BookingTime__day">{day} :</span>
            <TimePicker
              value={bookingTime[day].timeFrom}
              onChange={(value: string) => {
                this.onChangeFrom(value, day);
              }}
              className="BookingTime__day-picker"
              disableClock
              clearIcon=""
            />{" "}
            to{" "}
            <TimePicker
              value={bookingTime[day].timeTo}
              className="BookingTime__day-picker"
              onChange={(value: string) => {
                this.onChangeTo(value, day);
              }}
              disableClock
              clearIcon=""
            />
          </div>
        ))}
        <div className="Main__buttons-container">
          <Button onClick={this.saveBookingTime} color="black">
            Сохранить
          </Button>
          <Button disabled={!hasBookingTime} color="black">
            Календарь занятости
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  state,
  auth: state.firebase.auth,
  bookingtimes: state.fireStore.ordered.bookingtimes
});

const mapDispatchToProps = (dispatch: any) => ({
  saveBookingTime: (bookingTimeObj: any) =>
    dispatch(saveBookingTime(bookingTimeObj))
});

export const Main = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "bookingtimes"
    }
  ])
  //@ts-ignore
)(MainContainer);
