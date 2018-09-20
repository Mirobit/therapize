import React, { Component } from "react";
import api from "../utils/api";
import Slot from "./Slot";
import { Button } from "semantic-ui-react";
import moment from "moment";

class Availability extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monday: [{ start: "12.00", end: "13.00" }],
      tuesday: [{ start: "", end: "" }],
      wensday: [{ start: "", end: "" }],
      thursday: [{ start: "", end: "" }],
      friday: [{ start: "", end: "" }]
    };

    this._handleSlotChange = this._handleSlotChange.bind(this);
    this._update = this._update.bind(this);
    this._addSlot = this._addSlot.bind(this);
    this._removeSlot = this._removeSlot.bind(this);
  }

  componentDidMount() {
    api.get(`/api/availability/`).then(result => {
      console.log(result);
      this.setState(result);
    });
  }

  render() {
    const mappedDays = Object.keys(this.state).map(dayKey => {
      // put that in the return statement of the render function
      let mappedDaySlots = [];
      mappedDaySlots.push(<div>{dayKey}</div>);
      mappedDaySlots = mappedDaySlots.concat(
        this.state[dayKey].map((timeslot, index) => {
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
        {mappedDays}
        <Button primary onClick={this._update}>
          Submit
        </Button>
      </div>
    );
  }
  _addSlot(day) {
    let oldState = this.state[day];
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
    this.setState({ [day]: oldState });
  }

  _removeSlot(day, index) {
    let oldState = this.state[day];
    oldState.splice(index, 1);
    this.setState({ [day]: oldState });
  }

  _handleSlotChange(day, index, type, value) {
    this.setState({
      [day]: this.state[day].map((existingSlot, existingIndex) => {
        if (existingIndex !== index) return existingSlot;

        const changedSlot = { ...existingSlot };
        changedSlot[type] = value;
        return changedSlot;
      })
    });
    console.log(this.state);
  }

  _update() {
    // this.setState({
    //   error: ""
    // });

    api
      .post(`/api/availability/update`, { data: this.state })
      .then(data => {
        if (data.result) {
          console.log("success");
        } else {
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

export default Availability;
