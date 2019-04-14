import * as React from "react";
import * as Modal from "react-modal";
import { Input, Button } from "semantic-ui-react";
import "./BookingForm.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export interface BookingInfoModel {
  firstName: string;
  lastName: string;
  email: string;
}

export class BookingForm extends React.PureComponent<
  {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (bookingInfo: BookingInfoModel) => void;
  },
  BookingInfoModel
> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    };
  }

  onChangeFirstName = (event: React.FormEvent<HTMLInputElement>) => {
    const firstName = event.currentTarget.value;
    this.setState({
      firstName
    });
  };

  onChangeLastName = (event: React.FormEvent<HTMLInputElement>) => {
    const lastName = event.currentTarget.value;
    this.setState({
      lastName
    });
  };

  onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    this.setState({
      email
    });
  };

  onSubmit = () => {
    const { firstName, lastName, email } = this.state;
    const { onSubmit } = this.props;
    onSubmit({
      firstName,
      lastName,
      email
    });
  };
  render() {
    const { isOpen, onClose } = this.props;
    const { firstName, lastName, email } = this.state;
    return (
      <Modal
        onRequestClose={() => {}}
        onAfterClose={() => {}}
        isOpen={isOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="BookingForm">
          <div className="BookingForm__field">
            <label className="BookingForm__label" htmlFor="firstName">
              Имя:
            </label>
            <Input
              onChange={this.onChangeFirstName}
              value={firstName}
              className="BookingForm__input"
              id="firstName"
              type="text"
            />
          </div>
          <div className="BookingForm__field">
            <label className="BookingForm__label" htmlFor="lastName">
              Фамилия:
            </label>
            <Input
              onChange={this.onChangeLastName}
              value={lastName}
              className="BookingForm__input"
              id="lastName"
              type="text"
            />
          </div>
          <div className="BookingForm__field">
            <label className="BookingForm__label" htmlFor="email">
              Почта:
            </label>
            <Input
              onChange={this.onChangeEmail}
              value={email}
              className="BookingForm__input"
              id="email"
              type="text"
            />
          </div>
          <div />
          <div className="SignIn__buttons-container">
            <Button onClick={this.onSubmit} color="black">
              Сохранить
            </Button>
            <Button onClick={onClose} color="black">
              Закрыть
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
