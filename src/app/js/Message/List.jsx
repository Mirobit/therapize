import React from "react";
import { Input, Label, Menu, Icon, Divider, Segment, Button } from "semantic-ui-react";
import MailHeader from "./Header";
const componentName = ({ contacts, composeMail, activeItem }) => {
  const contact = contacts.find(el => el.name === activeItem);
  let mappedMailHeaders = (
    <span>
      <br /> <br /> No Mails
    </span>
  );
  if (contact != undefined) {
    mappedMailHeaders = contact.messages.map((el, index) => (
      <MailHeader
        title={el.title}
        date={el.date}
        new={el.delivered}
        file={el.file}
        id={el._id}
        key={index}
      />
    ));
  }
  return (
    <Segment style={{ marginLeft: "20px", marginTop: "0px", width: "600px" }}>
      <Button color="teal" onClick={composeMail} basic>
        <Icon name="pencil alternate" />
        New Mail
      </Button>
      {mappedMailHeaders}
    </Segment>
  );
};

export default componentName;
