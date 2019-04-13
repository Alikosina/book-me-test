import * as React from "react";
import { Input, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import "./SignIn.scss";
import { signIn } from "../../modules/auth/authActions";

class SignInContainer extends React.Component<
  {
    signIn: any;
    authError?: string;
  },
  {
    email: string;
    password: string;
  }
> {
  constructor(props: any) {
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

  handleChangeEmail = (value: any) => {
    const email = value.currentTarget.value;
    this.setState({ email });
  };

  handleChangePassword = (value: any) => {
    const password = value.currentTarget.value;
    this.setState({ password });
  };
  render() {
    const { email, password } = this.state;
    const { authError } = this.props;
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
            type="text"
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
          <Button color="black">Зарегистрироваться</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  authError: state.auth.authError
});

const mapDispatchToProps = (dispatch: any) => ({
  signIn: (signInData: any) => dispatch(signIn(signInData))
});

export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
