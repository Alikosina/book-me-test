import * as React from "react";
import { connect } from "react-redux";
// import { createUser, UserInfoModel } from "../../modules/user/userActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class MainContainer extends React.Component<{
  auth: any;
}> {
  render() {
    debugger;
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    return <div>Some Info</div>;
  }
}

const mapStateToProps = (state: any) => ({
  state,
  auth: state.firebase.auth
});

const mapDispatchToProps = (dispatch: any) => ({});

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
