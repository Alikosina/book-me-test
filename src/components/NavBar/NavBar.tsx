import * as React from "react";
import "./NavBar.scss";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NavBarContainer extends React.Component {
  render() {
    return (
      <div className="NavBar">
        <div />
        <div className="NavBar__auth-block">
          <Icon name="user outline" />
          <span className="NavBar__auth-block__sign-button">
            <Link className="NavBar__link" to="/signIn">
              Войти
            </Link>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

export const NavBar = connect(mapStateToProps)(NavBarContainer);
