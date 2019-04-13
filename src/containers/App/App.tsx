import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main } from "../Main/Main";
import { SignIn } from "../SignIn/SignIn";
import { NavBar } from "../../components/NavBar/NavBar";
import "semantic-ui-css/semantic.min.css";
import "./App.scss";

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <h1>Book-Me-Test</h1>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
    );
  }
}
