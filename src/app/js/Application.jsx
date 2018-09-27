import React from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Auth from "./Auth";
import Home from "./Home";
import Navigation from "./Navigation";
import Availability from "./Calendar/Availability";
import Profile from "./Profile";
import Match from "./Match";
import Chat from "./Chat";
import Message from "./Message";
import Appointment from "./Appointment";
import NotFound from "./NotFound";
import api from "./utils/api";

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this._setUser(true),
      interval: "",
      unreadcounter: 0
    };

    this._setUser = this._setUser.bind(this);
    this._resetUser = this._resetUser.bind(this);
  }

  componentDidMount() {
    this._setUser();
    // setInterval(() => {
    //   api.get("/api/message/unreadcount/").then(counter => {
    //     this.setState({ unreadcounter: counter.count });
    //   });
    // }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation user={this.state.user} counter={this.state.unreadcounter} />
          <Switch>
            <Route exact path="/" render={() => <Home user={this.state.user} />} />
            <Route exact path="/profile" render={() => <Profile user={this.state.user} />} />
            <Route path="/match" render={() => <Match user={this.state.user} />} />
            <Route
              exact
              path="/availability"
              render={() => <Availability user={this.state.user} />}
            />
            <Route
              exact
              path="/appointments"
              render={() => <Appointment user={this.state.user} />}
            />
            <Route path="/messages" render={() => <Message user={this.state.user} />} />
            <Route exact path="/chat" render={() => <Chat user={this.state.user} />} />
            <Route
              path="/auth"
              render={() => <Auth setUser={this._setUser} resetUser={this._resetUser} />}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  _resetUser() {
    this.setState({
      user: null
    });
  }

  _setUser(init) {
    const token = localStorage.getItem("identity");
    if (token) {
      const decoded = jwtDecode(token);
      delete decoded.iat;
      if (init) return decoded;
      this.setState({ user: decoded });
    } else {
      return null;
    }
  }
}

export default Application;
