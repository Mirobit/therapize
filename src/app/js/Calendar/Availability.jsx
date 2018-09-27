import React, { Component } from "react";
import api from "../utils/api";
import Slot from "./Slot";
import { Button, Message, Segment } from "semantic-ui-react";
import moment from "moment";
import Day from "./Day";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

class Availability extends Component {
  constructor(props) {
    super(props);
    if (!props.user) {
      props.history.push("/auth/sign-in");
    }
    // if (props.user.role != "Therapist") {
    //   props.history.push("/profile");
    // }

    this.state = {
      message: "",
      error: "",
      data: {
        Monday: [{ start: "", end: "" }],
        Tuesday: [{ start: "", end: "" }],
        Wensday: [{ start: "", end: "" }],
        Thursday: [{ start: "", end: "" }],
        Friday: [{ start: "", end: "" }]
      },
      loading: true
    };

    this._handleSlotChange = this._handleSlotChange.bind(this);
    this._update = this._update.bind(this);
    this._addSlot = this._addSlot.bind(this);
    this._removeSlot = this._removeSlot.bind(this);
  }

  componentDidMount() {
    api.get(`/api/availability/`).then(result => {
      if (result !== false) {
        this.setState({ data: result, loading: false });
      }
    });
  }

  render() {
    let msgbox = "";
    if (this.state.message !== "") {
      msgbox = (
        <Message compact positive>
          {this.state.message}
        </Message>
      );
    } else if (this.state.error !== "") {
      msgbox = (
        <Message compact negative>
          {this.state.error}
        </Message>
      );
    }
    let mappedDays = [];
    if (!this.state.loading) {
      mappedDays = Object.keys(this.state.data).map(dayKey => {
        return (
          <Day
            key={dayKey}
            timeslots={this.state.data[dayKey]}
            day={dayKey}
            handleSlotChange={this._handleSlotChange}
            removeSlot={this._removeSlot}
            addSlot={this._addSlot}
          />
        );
      });
    }

    return (
      <div className="flex-container-apps">
        <Segment style={{ width: "980px" }}>
          <div className="flex-container-ava">
            <div className="heading-app">Availability</div>
          </div>
          <div className="flex-container-ava" style={{ marginBottom: "20px" }}>
            {msgbox}
          </div>
          <div className="flex-container-ava">{mappedDays}</div>
          <div className="flex-container-ava">
            <Button basic color="teal" onClick={this._update}>
              Submit
            </Button>
          </div>
        </Segment>
      </div>
    );
  }
  _addSlot(day) {
    let oldState = this.state.data[day];
    if (oldState.length > 0 && oldState[oldState.length - 1].end !== "") {
      const prevTime = oldState[oldState.length - 1].end.split(".");
      oldState.push({
        start: moment({ H: prevTime[0], m: prevTime[1] })
          .add(1, "hours")
          .format("HH.mm"),
        end: moment({ H: prevTime[0], m: prevTime[1] })
          .add(4, "hours")
          .format("HH.mm")
      });
    } else {
      oldState.push({ start: "", end: "" });
    }
    console.log(this.state);
    this.setState({ data: { ...this.state.data, [day]: oldState } });
  }

  _removeSlot(day, index) {
    let oldState = this.state.data[day];
    oldState.splice(index, 1);
    this.setState({ data: { ...this.state.data, [day]: oldState } });
  }

  _handleSlotChange(day, index, type, value) {
    console.log(day, index, type, value);
    this.setState({
      data: {
        ...this.state.data,
        [day]: this.state.data[day].map((existingSlot, existingIndex) => {
          if (existingIndex !== index) return existingSlot;

          const changedSlot = { ...existingSlot };
          changedSlot[type] = value;
          return changedSlot;
        })
      }
    });
    console.log(this.state.data);
  }

  _update() {
    api
      .post(`/api/availability/update`, { data: this.state.data })
      .then(data => {
        if (data.result) {
          this.setState({ message: "Calendar successfuly updated!" });
          console.log("success");
        } else {
          this.setState({ error: "Calendar updated failed!" });
          console.log("failure");
        }
      })
      .catch(err => {
        this.setState({
          error: err.description
        });
      });
  }
}

export default withRouter(Availability);
