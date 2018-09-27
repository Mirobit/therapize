import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import Appointment from ".";

const Appbox = props => {
  let control = "";
  let chatButton = "";
  let removeButton = "";
  let msgButton = "";
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
  } else if (props.confirm == undefined) {
    control = (
      <Card.Content extra>
        <Button
          floated="left"
          size="small"
          icon
          basic
          onClick={() => props.chat(props.appointment.roomid)}
        >
          <span style={{ color: "#028090" }}>
            <Icon name="wechat" />
          </span>
        </Button>
        <Button
          floated="left"
          size="small"
          icon
          basic
          onClick={() => props.sendMessage(props.appointment.user)}
        >
          <span style={{ color: "#028090" }}>
            <Icon name="envelope outline" />
          </span>
        </Button>
        <Button
          onClick={() => props.delete(props.appointment._id)}
          basic
          icon
          size="small"
          floated="right"
        >
          <span style={{ color: "red" }}>
            <Icon name="trash alternate outline" />
          </span>
        </Button>
      </Card.Content>
    );
  } else {
    control = (
      <Card.Content extra>
        <Button
          onClick={() => props.delete(props.appointment._id)}
          basic
          icon
          size="small"
          floated="right"
        >
          <span style={{ color: "red" }}>
            <Icon name="trash alternate outline" />
          </span>
        </Button>
      </Card.Content>
    );
  }
  return (
    <div>
      <div
        className="ui card"
        style={{
          marginBottom: "20px",
          boxShadow: "0 5px 35px -15px rgba(0, 0, 0, 0.5)"
        }}
      >
        <Card.Content>
          <Image floated="right" size="tiny" src={props.user.profilePicture} />
          <Card.Header>
            <span style={{ color: "#00A896" }}>
              <Icon name="clock outline" />
            </span>
            {props.appointment.day + " " + props.appointment.starttime}
          </Card.Header>
          <span
            style={{
              color: "#3C3D3D",
              fontSize: "18px",
              marginTop: "10px",
              display: "inline-block"
            }}
          >
            <span style={{ color: "#00A896" }}>
              <Icon name="user outline" />
            </span>
            {props.user.role === "Therapist"
              ? props.appointment.user.name
              : props.appointment.therapist.name}
          </span>
          {/* <Card.Description>Counseling for {props.appointment.reason}</Card.Description> */}
        </Card.Content>
        {control}
      </div>
    </div>
  );
};

export default Appbox;
