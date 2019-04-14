import * as React from "react";
import { Input, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./SignUp.scss";
import { signUp } from "../../modules/auth/authActions";

class SignUpContainer extends React.Component<
  {
    signUp: any;
    authError?: string;
    auth: any;
  },
  {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  }

  signUp = () => {
    const { email, password, firstName, lastName } = this.state;
    this.props.signUp({
      email,
      password,
      firstName,
      lastName
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

  handleChangeFirstName = (event: React.FormEvent<HTMLInputElement>) => {
    const firstName = event.currentTarget.value;
    this.setState({ firstName });
  };

  handleChangeLastName = (event: React.FormEvent<HTMLInputElement>) => {
    const lastName = event.currentTarget.value;
    this.setState({ lastName });
  };

  render() {
    const { email, password, firstName, lastName } = this.state;
    const { authError, auth } = this.props;

    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="SignUp">
        <div className="SignUp__field">
          <label className="SignUp__label" htmlFor="email">
            Email:
          </label>
          <Input
            onChange={this.handleChangeEmail}
            value={email}
            className="SignUp__input"
            id="email"
            type="text"
          />
        </div>
        <div className="SignUp__field">
          <label className="SignUp__label" htmlFor="password">
            Пароль:
          </label>
          <Input
            onChange={this.handleChangePassword}
            value={password}
            className="SignUp__input"
            id="password"
            type="password"
          />
        </div>
        <div className="SignUp__field">
          <label className="SignUp__label" htmlFor="firstName">
            Имя:
          </label>
          <Input
            onChange={this.handleChangeFirstName}
            value={firstName}
            className="SignUp__input"
            id="firstName"
            type="firstName"
          />
        </div>
        <div className="SignUp__field">
          <label className="SignUp__label" htmlFor="lastName">
            Фамилия:
          </label>
          <Input
            onChange={this.handleChangeLastName}
            value={lastName}
            className="SignUp__input"
            id="lastName"
            type="lastName"
          />
        </div>
        <div>
          {authError ? (
            <Message negative>
              <Message.Header>Ошибка авторизации!</Message.Header>
            </Message>
          ) : null}
        </div>
        <div className="SignUp__buttons-container">
          <Button onClick={this.signUp} color="black">
            Зарегистрироваться
          </Button>
          <Button color="black">
            <Link className="SignUp__link" to="/signin">
              Войти
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
  signUp: (newUser: any) => dispatch(signUp(newUser))
});

export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
