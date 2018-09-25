import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { Message } from "semantic-ui-react";

import Find from "./Find";
import Pick from "./Pick";
import api from "../utils/api";

class Match extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      error: "",
      data: {
        gender: "",
        topics: [],
        days: []
      },
      matches: [],
      topmatch: "",
      mode: "",
      pickedTime: false,
      confirmedTime: false,
      pickedTimeSlot: ""
    };

    this._handleFindChange = this._handleFindChange.bind(this);
    this._find = this._find.bind(this);
    this._pickTimeSlot = this._pickTimeSlot.bind(this);
    this._cancelTimeSlot = this._cancelTimeSlot.bind(this);
    this._confirmTimeSlot = this._confirmTimeSlot.bind(this);
  }

  componentDidMount() {
    api.get(`/api/match/find`).then(user => {
      this.setState({ data: { ...this.state.data, ...user } });
    });
  }

  render() {
    let msgbox = "";
    if (this.state.message !== "") {
      msgbox = <Message positive>{this.state.message}</Message>;
    } else if (this.state.error !== "") {
      msgbox = <Message negative>{this.state.error}</Message>;
      console.log(this.state.error);
    }
    return (
      <div>
        {" "}
        {msgbox}
        <Switch>
          <Route
            exact
            path="/match"
            render={() => (
              <Find
                handleFindChange={this._handleFindChange}
                find={this._find}
                find={this._find}
                data={this.state.data}
                topmatch={this.state.topmatch}
                matches={this.state.matches}
                mode={this.state.mode}
              />
            )}
          />
          <Route
            exact
            path="/match/pick"
            render={() => (
              <Pick
                topmatch={this.state.topmatch}
                pickTimeSlot={this._pickTimeSlot}
                cancelTimeSlot={this._cancelTimeSlot}
                confirmTimeSlot={this._confirmTimeSlot}
                pickedTime={this.state.pickedTime}
                pickedTimeSlot={this.state.pickedTimeSlot}
              />
            )}
          />
          <Route exact path="/match/confirm" render={() => <Find />} />
        </Switch>
      </div>
    );
  }

  _handleFindChange = (event, { name, value }) => {
    this.setState({ data: { ...this.state.data, [name]: value } });
  };

  _pickTimeSlot(day, start, end) {
    this.setState({
      pickedTime: true,
      pickedTimeSlot: { day: day, start: start, end: end }
    });
  }

  _cancelTimeSlot() {
    this.setState({
      pickedTime: false,
      pickedTimeSlot: ""
    });
  }

  _confirmTimeSlot() {
    console.log("timeslot confirmed");
    api
      .post(`/api/match/confirm`, {
        slot: this.state.pickedTimeSlot,
        therapist: this.state.topmatch._id
      })
      .then(data => {
        if (data) {
          this.setState({
            message: "Appoint successfully requested. You will be notified shortly."
          });
        } else {
          this.setState({
            error: "An error occoured, please try again."
          });
        }
        this.setState({
          pickedTime: false,
          confirmedTime: true,
          pickedTimeSlot: ""
        });
        this.props.history.push("/match");
      });
  }

  _find() {
    this.setState({ error: "", message: "" });
    api
      .post(`/api/match/find`, { data: this.state.data })
      .then(data => {
        if (!data) {
          this.setState({ message: "No Therapist found" });
          console.log("no therapist");
        } else if (data.result === false) {
          console.log(data);
          this.setState({ error: "Error during the search" });
          console.log("failure");
        } else {
          console.log("Therapist found", data);
          this.setState({ matches: data.therapists, topmatch: data.therapists[0] });
          this.props.history.push("/match/pick");
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: err.description
        });
      });
  }
}

export default withRouter(Match);
