import * as React from "react";
import { Input, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./SignIn.scss";
import { signIn } from "../../modules/auth/authActions";
import { SignInContainerModel } from "./SignInContainerModel";

class SignInContainer extends React.Component<
  SignInContainerModel.Props,
  SignInContainerModel.State
> {
  constructor(props: SignInContainerModel.Props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  signIn = () => {
    const { email, password } = this.state;
    this.props.signIn({
      email,
      password
    });
  };

  handleChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    this.setState({ email });
  };

  handleChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    const password = event.currentTarget.value;
    this.setState({ password });
  };
  render() {
    const { email, password } = this.state;
    const { authError, auth } = this.props;

    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="SignIn">
        <div className="SignIn__field">
          <label className="SignIn__label" htmlFor="email">
            Email:
          </label>
          <Input
            onChange={this.handleChangeEmail}
            value={email}
            className="SigIn__input"
            id="email"
            type="text"
          />
        </div>
        <div className="SignIn__field">
          <label className="SignIn__label" htmlFor="password">
            Пароль:
          </label>
          <Input
            onChange={this.handleChangePassword}
            value={password}
            className="SigIn__input"
            id="password"
            type="password"
          />
        </div>
        <div>
          {authError ? (
            <Message negative>
              <Message.Header>Ошибка авторизации!</Message.Header>
            </Message>
          ) : null}
        </div>
        <div className="SignIn__buttons-container">
          <Button onClick={this.signIn} color="black">
            Войти
          </Button>
          <Button color="black">
            <Link className="SignIn__link" to="/signup">
              Зарегистрироваться
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  signIn: (signInData: SignInContainerModel.State) =>
    dispatch(signIn(signInData))
});

export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
