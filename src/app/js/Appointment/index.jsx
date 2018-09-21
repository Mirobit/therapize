import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import api from "../utils/api";

class Appointment extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // this._handleInputChange = this._handleInputChange.bind(this);
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/auth/sign-up"
          render={() => (
            <SignUp
              handleInputChange={this._handleInputChange}
              email={this.state.email}
              password={this.state.password}
              error={this.state.error}
              sign={this._sign}
            />
          )}
        />
        <Route
          exact
          path="/auth/sign-in"
          render={() => (
            <SignIn
              handleInputChange={this._handleInputChange}
              email={this.state.email}
              password={this.state.password}
              error={this.state.error}
              sign={this._sign}
            />
          )}
        />
        <Route
          exact
          path="/auth/logout"
          render={() => <Logout resetUser={this.props.resetUser} />}
        />
      </Switch>
    );
  }
}

export default Appointment;
