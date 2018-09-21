import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import React, { Component } from "react";

import Find from "./Find";
import api from "../utils/api";

class Match extends Component {
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
          path="/match"
          render={() => (
            <Find
              handleInputChange={this._handleInputChange}
              error={this.state.error}
              sign={this._sign}
            />
          )}
        />
        <Route exact path="/match/confirm" render={() => <Find />} />
      </Switch>
    );
  }
}

export default Match;
