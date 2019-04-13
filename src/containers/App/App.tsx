import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Main } from "../Main/Main";
import { NavBar } from "../../components/NavBar/NavBar";
import "./App.scss";

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <h1>Book-Me-Test</h1>
        <Main />
      </BrowserRouter>
    );
  }
}
