import React from "react";
import { Input, Label, Menu, Icon, Divider, Segment, Button, Header } from "semantic-ui-react";

const Contact = ({ contacts, activeItem, handleItemClick }) => {
  console.log(contacts);
  const mappedContacts = contacts.map((el, index) => (
    <Menu.Item key={index} name={el.name} active={activeItem === el.name} onClick={handleItemClick}>
      <Label color={activeItem === el.name ? "blue" : "teal"}>{el.counter}</Label>
      {el.name}
    </Menu.Item>
  ));
  return (
    <Menu size="large" vertical>
      <Menu.Item>
        <Header as="h4">Contacts</Header>
      </Menu.Item>
      {mappedContacts}
    </Menu>
  );
};

export default Contact;
