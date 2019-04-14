import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main } from "../Main/Main";
import { SignIn } from "../SignIn/SignIn";
import { SignUp } from "../SignUp/SignUp";
import { Booking } from "../Booking/Booking";
import { NavBar } from "../../components/NavBar/NavBar";
import "semantic-ui-css/semantic.min.css";
import "./App.scss";

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/booking" component={Booking} />
          <Route exact path="/booking/:authorId" component={Booking} />
        </Switch>
      </BrowserRouter>
    );
  }
}
