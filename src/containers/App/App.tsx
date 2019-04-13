import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Main } from "../Main/Main";

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <h1>Book-Me-Test</h1>
        <Main />
      </BrowserRouter>
    );
  }
}
