import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
const optionsSkills = [
  { key: "de", text: "Depression", value: "depression" },
  { key: "an", text: "Anxiety", value: "anxiety" },
  { key: "st", text: "Stress", value: "stress" },
  { key: "ar", text: "Anorexia", value: "anorexia" }
];
class Profile extends Component {
  constructor(props) {
    super(props);

    if (!props.user) {
      props.history.push("/auth/sign-in");
    }

    this.state = {
      message: "",
      error: "",
      data: {
        gender: "",
        name: "",
        description: "",
        age: "",
        available: false,
        skills: []
      }
    };

    this._handleChange = this._handleChange.bind(this);
    this._save = this._save.bind(this);
  }

  componentDidMount() {
    api.get(`/api/profile/`).then(user => {
      console.log("user", user);
      this.setState({ data: user });
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
        <img width="100px" src={this.props.user.profilePicture} alt="" />
        <br />
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Name"
              placeholder="Name"
              name="name"
              onChange={this._handleChange}
              value={this.state.data.name}
            />
            <Form.Field
              control={Input}
              type="number"
              label="Age"
              name="age"
              placeholder="Age"
              maxLength="2"
              max={99}
              min={18}
              value={this.state.data.age}
              onChange={this._handleChange}
            />
            <Form.Field>
              <label>Skills</label>
              <Dropdown
                placeholder="Skills"
                name="skills"
                value={this.state.data.gender}
                onChange={this._handleChange}
                fluid
                multiple
                selection
                options={optionsSkills}
                value={this.state.data.skills}
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
          <Form.Field
            control={TextArea}
            label="About"
            name="description"
            placeholder="Tell your clients more about you..."
            onChange={this._handleChange}
          />
          <Form.Field
            control={Checkbox}
            label="Available"
            onClick={this._handleChange}
            name="available"
            toggle
            checked={this.state.data.available}
          />
          <Form.Field control={Button} color="blue" onClick={this._save}>
            Save
          </Form.Field>
        </Form>
      </div>
    );
  }

  _handleChange = (event, { name, value }) => {
    if (name === "available") {
      this.setState({ data: { ...this.state.data, available: !this.state.data.available } });
    } else {
      this.setState({ data: { ...this.state.data, [name]: value } });
    }
  };

  _save() {
    console.log(this.state.data);
    api
      .post(`/api/profile/update`, { data: this.state.data })
      .then(data => {
        if (data.result) {
          this.setState({ message: "Profile successfuly updated!" });
          console.log("success");
        } else {
          this.setState({ error: "Profile updated failed!" });
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

export default Profile;
