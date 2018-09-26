import React, { Component } from "react";
import {
  Input,
  Label,
  Menu,
  Header,
  Icon,
  Divider,
  Segment,
  Button,
  Form,
  TextArea
} from "semantic-ui-react";
import api from "../utils/api";

class Compose extends Component {
  constructor(props) {
    super(props);
    console.log(props.receiver);
    this.state = {
      receiver: props.receiver._id,
      loading: true,
      title: "",
      file: "",
      content: ""
    };

    this._handleComposeChange = this._handleComposeChange.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this._submit = this._submit.bind(this);
  }

  _handleComposeChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  _handleFileChange = file => {
    this.setState({ file });
  };

  _submit() {
    console.log(this.state.receiver);
    api
      .post(`/api/message`, {
        title: this.state.title,
        content: this.state.content,
        to: this.state.receiver
      })
      .then(data => {
        if (data.result) {
          this.setState({ message: "Mail send" });
          console.log("success");
        } else {
          this.setState({ error: "Mail failed!" });
          console.log("failure");
        }
        this.props.history.push("/messages/");
      })
      .catch(err => {
        this.setState({
          error: err.description
        });
      });
  }

  render() {
    return (
      <Segment style={{ marginLeft: "20px", marginTop: "0px", width: "500px" }}>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-first-name"
              control={Input}
              label="Title"
              onChange={this._handleComposeChange}
              name="title"
              placeholder="Title"
              value={this.state.title}
            />
          </Form.Group>
          <Form.Field
            id="form-textarea-control-opinion"
            control={TextArea}
            label="Message"
            onChange={this._handleComposeChange}
            name="content"
            placeholder="Message"
            value={this.state.content}
          />
          <input
            type="file"
            value={this.props.picture}
            onChange={event => this._handleFileChange(event.target.files[0])}
            className="input"
            placeholder="Profile Picture"
          />
          <br />
          <br />
          <Form.Field control={Button} color="blue" onClick={this._submit}>
            Send
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default Compose;
