import React from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Label,
  Menu,
  Header,
  Icon,
  Divider,
  Segment,
  Button,
  Form
} from "semantic-ui-react";

class SignIn extends React.Component {
  componentDidMount() {
    this.props.handleInputChange("email", "");
    this.props.handleInputChange("password", "");
  }

  render() {
    return (
      <div className="main">
        <div className="flex-container-apps" style={{ paddingTop: "100px" }}>
          <Segment
            style={{ marginLeft: "20px", marginTop: "0px", width: "240px", paddingTop: "20px" }}
          >
            <div className="heading-app">
              <center>Login</center>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Form.Field
                control={Input}
                placeholder="Email"
                name="email"
                onChange={evt => this.props.handleInputChange("email", evt.target.value)}
                value={this.props.email}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Form.Field
                control={Input}
                placeholder="Password"
                name="password"
                type="password"
                value={this.props.password}
                onChange={evt => this.props.handleInputChange("password", evt.target.value)}
              />
            </div>

            <Button basic color="blue" onClick={() => this.props.sign("in")}>
              Submit
            </Button>
            <Link className="link" to="/auth/sign-up">
              <Button color="teal" basic>
                Sign up
              </Button>
            </Link>
            <br />
            <p>{this.props.error}</p>
          </Segment>
        </div>
      </div>
    );
  }
}

export default SignIn;
