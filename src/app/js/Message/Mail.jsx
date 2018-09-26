import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Input, Label, Menu, Header, Icon, Divider, Segment, Button } from "semantic-ui-react";
import api from "../utils/api";

class Mail extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      activeItem: "",
      messageId: props.match.params.id,
      message: "",
      error: "",
      loading: true,
      contacts: []
    };

    // this._handleItemClick = this._handleItemClick.bind(this);
  }
  componentDidMount() {
    api.get("/api/message/" + this.state.messageId).then(message => {
      console.log(message);
      this.setState({
        message,
        loading: false
      });
      if (!message.delivered) {
        console.log("new mail");
        this.props.readLabel(this.state.messageId);
      }
    });
  }
  render() {
    if (this.state.loading) {
      return "";
    }
    return (
      <Segment style={{ marginLeft: "20px", marginTop: "0px", width: "500px", paddingTop: "20px" }}>
        <span
          style={{
            display: "inline-block",
            color: "#6A6C6E",
            fontSize: "20px",
            marginRight: "15px"
          }}
        >
          {this.state.message.title}
        </span>
        <span style={{ display: "inline-block", color: "grey" }}>{this.state.message.date}</span>
        <Divider />
        {this.state.message.content}
        <Divider />
        <Button.Group>
          <Button basic primary icon>
            <Icon name="reply" />
          </Button>
          {this.state.message.file && (
            <Button basic primary icon>
              <Icon name="cloud download" />
            </Button>
          )}
        </Button.Group>
        <span style={{ float: "right" }}>
          <Button basic negative icon>
            <Icon name="trash alternate outline" />
          </Button>
        </span>
      </Segment>
    );
  }
}

export default withRouter(Mail);
