import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Input, Label, Menu, Header, Icon, Divider, Segment, Button } from "semantic-ui-react";
import Contact from "./Contact";
import List from "./List";
import Mail from "./Mail";
import Compose from "./Compose";
import moment from "moment";
import { Link } from "react-router-dom";
import api from "../utils/api";

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "",
      message: "",
      error: "",
      loading: true,
      contacts: []
    };

    this._deleteMail = this._deleteMail.bind(this);
    this._readLabel = this._readLabel.bind(this);
    this._composeMail = this._composeMail.bind(this);
    this._handleItemClick = this._handleItemClick.bind(this);
  }
  componentDidMount() {
    api.get(`/api/message`).then(contacts => {
      console.log(contacts);
      let activeItem = "";
      if (contacts.length !== 0) {
        activeItem = contacts[0].name;
      }
      this.setState({ contacts, activeItem: activeItem, loading: false });
    });
  }

  _handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push("/messages/");
  };

  _composeMail() {
    this.props.history.push("/messages/compose");
  }

  _deleteMail(id) {
    const index = this.state.contacts.findIndex(el => el.name === this.state.activeItem);
    let contacts = this.state.contacts;
    const indexMsg = contacts[index].messages.findIndex(el => el._id === id);
    contacts[index].messages.splice(indexMsg, 1);
    this.setState({ contacts: contacts });
    api
      .delete("/api/message/" + id)
      .then(data => {
        this.props.history.push("/messages");
      })
      .catch(err => {
        console.log(err);
      });
  }

  _readLabel(id) {
    console.log("call redu", id);
    const index = this.state.contacts.findIndex(el => el.name === this.state.activeItem);
    let contacts = this.state.contacts;
    contacts[index].counter--;
    let msg = contacts[index].messages.find(el => el._id == id);
    console.log("msg", msg);
    msg.delivered = true;
    this.setState({ contacts: contacts });
  }

  render() {
    if (this.state.loading) {
      return "";
    }
    return (
      <div className="flex-container-apps">
        <Contact
          contacts={this.state.contacts}
          activeItem={this.state.activeItem}
          handleItemClick={this._handleItemClick}
        />

        <Switch>
          <Route
            exact
            path="/messages/compose"
            render={() => (
              <Compose
                receiver={this.state.contacts.find(el => el.name === this.state.activeItem)}
              />
            )}
          />
          <Route
            path="/messages/:id"
            render={props => (
              <Mail readLabel={this._readLabel} deleteMail={this._deleteMail} {...props} />
            )}
          />
          <Route
            exact
            path="/messages"
            render={() => (
              <List
                composeMail={this._composeMail}
                contacts={this.state.contacts}
                activeItem={this.state.activeItem}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Message);
