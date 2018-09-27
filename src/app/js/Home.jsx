import React from "react";
import { withRouter } from "react-router";

const Home = props => {
  props.history.push("/auth/sign-in");
  return (
    <div className="container">
      <h1>Hello, {props.user ? props.user.email : "Stranger"}!</h1>
    </div>
  );
};

export default withRouter(Home);
