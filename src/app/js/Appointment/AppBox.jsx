import React from "react";
import { Button, Card } from "semantic-ui-react";
import Appointment from ".";

const Appbox = props => {
  let control = "";
  let chatButton = "";
  if (props.confirm != undefined && props.user.role === "Therapist") {
    control = (
      <Card.Content extra>
        <div className="ui two buttons">
          <Button onClick={() => props.confirm(props.appointment._id)} basic color="green">
            Approve
          </Button>
          <Button onClick={() => props.delete(props.appointment._id)} basic color="red">
            Decline
          </Button>
        </div>
      </Card.Content>
    );
  }
  if (props.confirm == undefined) {
    chatButton = (
      <Button
        floated="right"
        size="mini"
        color="blue"
        onClick={() => props.chat(props.appointment.roomid)}
      >
        Chat
      </Button>
    );
  }
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {props.user.role === "Therapist" ? props.appointment.user.name : "name"}
        </Card.Header>
        <Card.Meta>{props.appointment.reason}</Card.Meta>
        <Card.Description>
          {chatButton}
          {props.appointment.day + " " + props.appointment.starttime}
        </Card.Description>
      </Card.Content>
      {control}
    </Card>
  );
};

export default Appbox;
