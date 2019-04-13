import * as React from "react";
import "./NavBar.scss";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../modules/auth/authActions";

class NavBarContainer extends React.Component<{
  auth: any;
  signOut: () => void;
}> {
  render() {
    const { auth, signOut } = this.props;

    return (
      <div className="NavBar">
        <div />
        <div className="NavBar__auth-block">
          <Icon name="user outline" />
          <span className="NavBar__auth-block__sign-button">
            {auth.uid ? (
              <a onClick={signOut} className="NavBar__link">
                Выйти
              </a>
            ) : (
              <Link className="NavBar__link" to="/signIn">
                Войти
              </Link>
            )}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export const NavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarContainer);
