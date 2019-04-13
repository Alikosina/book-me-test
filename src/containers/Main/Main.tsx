import * as React from "react";
import { connect } from "react-redux";
import { getUserInfo } from "../../modules/user/userActions";

class MainContainer extends React.Component<{
  getUser: any;
}> {
  componentDidMount() {
    this.props.getUser(1);
  }

  render() {
    console.log("props = ", this.props);
    return <div>Some Info</div>;
  }
}

const mapStateToProps = (state: any) => ({
  state
});

const mapDispatchToProps = (dispatch: any) => ({
  getUser: (id: number) => dispatch(getUserInfo(id))
});

export const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
