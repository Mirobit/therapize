import React, { Component } from "react";
import api from "../utils/api";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Select,
  TextArea,
  Message
} from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

const optionsDays = [
  { key: "mo", text: "Monday", value: "monday" },
  { key: "tu", text: "Tuesday", value: "tuesday" },
  { key: "we", text: "Wensday", value: "wensday" },
  { key: "th", text: "Thursday", value: "thursday" },
  { key: "fr", text: "Friday", value: "friday" }
];

const optionsTopics = [
  { key: "de", text: "Depression", value: "depression" },
  { key: "an", text: "Anxiety", value: "anxiety" },
  { key: "st", text: "Stress", value: "stress" },
  { key: "ar", text: "Anorexia", value: "anorexia" }
];

class Find extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      error: "",
      data: {
        gender: "",
        topics: [],
        days: []
      }
    };

    this._handleChange = this._handleChange.bind(this);
    this._find = this._find.bind(this);
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
    }
    return (
      <div className="container">
        {msgbox}
        <br />
        <Form>
          Therapist preferences
          <Form.Group widths="equal">
            <Form.Field>
              <label>Days</label>
              <Dropdown
                placeholder="Days"
                name="days"
                value={this.state.data.day}
                onChange={this._handleChange}
                fluid
                multiple
                selection
                options={optionsDays}
                value={this.state.data.days}
              />
            </Form.Field>
            <Form.Field>
              <label>Topics</label>
              <Dropdown
                placeholder="Topics"
                name="topics"
                value={this.state.data.topics}
                onChange={this._handleChange}
                fluid
                multiple
                selection
                options={optionsTopics}
                value={this.state.data.topics}
              />
            </Form.Field>
            <Form.Field
              control={Select}
              label="Gender"
              options={options}
              placeholder="Gender"
              name="gender"
              value={this.state.data.gender}
              onChange={this._handleChange}
            />
          </Form.Group>
          <Form.Field control={Button} color="blue" onClick={this._find}>
            Find Therapist
          </Form.Field>
        </Form>
      </div>
    );
  }
  _handleChange = (event, { name, value }) => {
    this.setState({ data: { ...this.state.data, [name]: value } });
  };

  _find() {
    api
      .post(`/api/match/find`, { data: this.state.data })
      .then(data => {
        if (data.result) {
          this.setState({ message: "Therapist found" });
          console.log("success");
        } else {
          this.setState({ error: "Error during the search" });
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

export default Find;
