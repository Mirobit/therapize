import React from "react";
import { Link } from "react-router-dom";
import { Input, Label, Menu, Icon, Divider, Segment, Button } from "semantic-ui-react";
import moment from "moment";

const Header = props => {
  return (
    <React.Fragment>
      <Divider />
      <Link to={"/messages/" + props.id}>
        <span style={{ display: "inline-block", float: "left", marginRight: "10px" }}>
          {props.new ? (
            <Icon name="envelope outline" color="grey" />
          ) : (
            <Icon name="envelope" color="grey" />
          )}
        </span>
        <span className={props.new ? "mailheader" : "mailheadernew"} style={{ color: "black" }}>
          {props.title}
        </span>
        <span style={{ display: "inline-block", float: "right" }}>
          {props.file ? <Icon name="attach" color="grey" /> : ""}
        </span>
        <span style={{ float: "right", display: "inline-block", color: "grey" }}>
          {moment(new Date(props.date)).format("ddd h:mm")}
        </span>
      </Link>
    </React.Fragment>
  );
};

export default Header;
