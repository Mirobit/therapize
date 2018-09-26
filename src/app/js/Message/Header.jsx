import React from "react";
import { Link } from "react-router-dom";
import { Input, Label, Menu, Icon, Divider, Segment, Button } from "semantic-ui-react";
import moment from "moment";

const Header = props => {
  return (
    <React.Fragment>
      <Divider />
      <Link to={"/messages/" + props.id}>
        <span className={props.new ? "mailheader" : "mailheadernew"} style={{ color: "black" }}>
          {props.title}
        </span>
        <span style={{ marginLeft: "20px", display: "inline-block", color: "grey" }}>
          {moment(new Date(props.date)).format("ddd h:mm")}
        </span>
        <span style={{ display: "inline-block", float: "right" }}>
          {props.file ? <Icon name="attach" color="grey" /> : ""}
        </span>
      </Link>
    </React.Fragment>
  );
};

export default Header;
