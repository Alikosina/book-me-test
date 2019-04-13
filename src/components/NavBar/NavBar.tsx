import * as React from "react";
import "./NavBar.scss";

export const NavBar = (props: any) => {
  return (
    <div className="NavBar">
      <div />
      <div className="NavBar__auth-block">
        <span className="NavBar__auth-block__sign-button">Войти</span>
      </div>
    </div>
  );
};
