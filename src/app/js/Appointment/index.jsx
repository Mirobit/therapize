import { Route, Switch, withRouter } from "react-router-dom";
import React, { Component } from "react";
import AppBox from "./AppBox";
import { Message, Card } from "semantic-ui-react";

import api from "../utils/api";

class Appointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      confirmedApps: [],
      unconfirmedApps: [],
      message: "",
      error: ""
    };

    this._confirm = this._confirm.bind(this);
    this._delete = this._delete.bind(this);
    this._chat = this._chat.bind(this);
  }

  componentDidMount() {
    api.get(`/api/appointments`).then(appointments => {
      this.setState({ appointments });
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
    const mappedConfirmed = [];
    const mappedUnconfirmed = [];
    for (const appointment of this.state.appointments) {
      if (appointment.status === "Confirmed") {
        mappedConfirmed.push(
          <AppBox
            key={appointment._id}
            appointment={appointment}
            chat={this._chat}
            delete={this._delete}
            user={this.props.user}
          />
        );
      } else {
        mappedUnconfirmed.push(
          <AppBox
            key={appointment._id}
            appointment={appointment}
            confirm={this._confirm}
            delete={this._delete}
            user={this.props.user}
          />
        );
      }
    }
    return (
      <div className="flex-container-apps">
        {msgbox}
        <div>
          <div className="heading-app">Confirmed Appointments</div>

          {mappedConfirmed.length === 0 ? "No cofirmed appointments" : mappedConfirmed}
        </div>
        <div style={{ marginLeft: "100px" }}>
          <div className="heading-app">Unconfirmed Appointments</div>

          {mappedUnconfirmed.length === 0 ? "No uncofirmed appointments" : mappedUnconfirmed}
        </div>
      </div>
    );
  }

  _confirm(id) {
    this.setState({ error: "", message: "" });
    api.post(`api/appointments/confirm`, { id }).then(result => {
      if (result) {
        api.get(`/api/appointments`).then(appointments => {
          this.setState({ message: "Appointment succesfully confirmed" });
          this.setState({ appointments });
        });
      } else {
        this.setState({ error: "Error confirming appointment" });
      }
    });
  }

  _delete(id) {
    this.setState({ error: "", message: "" });
    api.post(`api/appointments/delete`, { id }).then(result => {
      if (result) {
        api.get(`/api/appointments`).then(appointments => {
          this.setState({ message: "Appointment succesfully declined" });
          this.setState({ appointments });
        });
      } else {
        this.setState({ error: "Error delcining appointment" });
      }
    });
  }
  _chat(roomid) {
    localStorage.setItem("roomid", roomid);
    this.props.history.push("/chat");
  }
}

export default withRouter(Appointment);
