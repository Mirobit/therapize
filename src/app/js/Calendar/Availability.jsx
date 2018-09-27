import React, { Component } from "react";
import api from "../utils/api";
import Slot from "./Slot";
import { Button, Message } from "semantic-ui-react";
import moment from "moment";
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
      }
    };

    this._handleSlotChange = this._handleSlotChange.bind(this);
    this._update = this._update.bind(this);
    this._addSlot = this._addSlot.bind(this);
    this._removeSlot = this._removeSlot.bind(this);
  }

  componentDidMount() {
    api.get(`/api/availability/`).then(result => {
      if (result !== false) {
        this.setState({ data: result });
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
    const mappedDays = Object.keys(this.state.data).map(dayKey => {
      let mappedDaySlots = [];
      mappedDaySlots.push(<div>{dayKey}</div>);
      mappedDaySlots = mappedDaySlots.concat(
        this.state.data[dayKey].map((timeslot, index) => {
          return (
            <Slot
              day={dayKey}
              timeslot={timeslot}
              index={index}
              key={dayKey + index}
              handleSlotChange={this._handleSlotChange}
              removeSlot={this._removeSlot}
            />
          );
        })
      );
      mappedDaySlots.push(
        <Button primary onClick={() => this._addSlot(dayKey)}>
          More
        </Button>
      );
      return mappedDaySlots;
    });

    return (
      <div>
        {msgbox}
        {mappedDays}
        <Button primary onClick={this._update}>
          Submit
        </Button>
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
    let oldState = this.state[day];
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
