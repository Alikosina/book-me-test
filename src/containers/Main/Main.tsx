import * as React from "react";
import { connect } from "react-redux";
import { createUser, UserInfoModel } from "../../modules/user/userActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class MainContainer extends React.Component<any> {
  componentDidMount() {
    // this.props.getUser(1);
  }

  render() {
    return <div>Some Info</div>;
  }
}

const mapStateToProps = (state: any) => ({
  state,
  users: state.fireStore.data.users || {}
});

const mapDispatchToProps = (dispatch: any) => ({
  createUser: (userInfo: UserInfoModel) => dispatch(createUser(userInfo))
});

export const Main = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "users"
    }
  ])
  //@ts-ignore
)(MainContainer);
