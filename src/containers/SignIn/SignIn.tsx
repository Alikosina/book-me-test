import * as React from "react";
import { Input } from "semantic-ui-react";
import "./SignIn.scss";

export class SignIn extends React.Component {
  render() {
    return (
      <div className="SignIn">
        <div className="SignIn__field">
          <label className="SignIn__label" htmlFor="login">
            Логин:
          </label>
          <Input className="SigIn__input" id="login" type="text" />
        </div>
        <div className="SignIn__field">
          <label className="SignIn__label" htmlFor="password">
            Пароль:
          </label>
          <Input className="SigIn__input" id="password" type="text" />
        </div>
        <div className="SignIn__buttons-container">
          <button>Войти</button>
          <button>Зарегистрироваться</button>
        </div>
      </div>
    );
  }
}
