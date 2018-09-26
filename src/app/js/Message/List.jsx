import React from "react";
import { Input, Label, Menu, Icon, Divider, Segment, Button } from "semantic-ui-react";
import MailHeader from "./Header";
const componentName = ({ messages, composeMail }) => {
  const mappedMailHeaders = messages.map((el, index) => (
    <MailHeader
      title={el.title}
      date={el.date}
      new={el.delivered}
      file={el.file}
      id={el._id}
      key={index}
    />
  ));
  return (
    <Segment style={{ marginLeft: "20px", marginTop: "0px", width: "500px" }}>
      <Button onClick={composeMail} basic>
        <Icon name="pencil alternate" />
        New Mail
      </Button>
      {mappedMailHeaders}
    </Segment>
  );
};

export default componentName;
