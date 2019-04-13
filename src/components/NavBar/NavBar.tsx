import * as React from "react";
import "./NavBar.scss";
import { Icon } from "semantic-ui-react";

export const NavBar = (props: any) => {
  return (
    <div className="NavBar">
      <div />
      <div className="NavBar__auth-block">
        <Icon name="user outline" />
        <span className="NavBar__auth-block__sign-button">Войти</span>
      </div>
    </div>
  );
};
