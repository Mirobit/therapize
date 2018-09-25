import React from "react";
import { Button, Card } from "semantic-ui-react";
import Appointment from ".";

const Appbox = props => {
  let control = "";
  if (props.confirm != undefined) {
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
  return (
    <Card>
      <Card.Content>
        <Card.Header>{props.appointment.user.name}</Card.Header>
        <Card.Meta>{props.appointment.reason}</Card.Meta>
        <Card.Description>
          <Button floated="right" size="mini" color="blue">
            Chat
          </Button>
          {props.appointment.day + " " + props.appointment.starttime}
        </Card.Description>
      </Card.Content>
      {control}
    </Card>
  );
};

export default Appbox;
