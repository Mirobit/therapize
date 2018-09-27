import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Select,
  TextArea,
  Message
} from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

const optionsDays = [
  { key: "mo", text: "Monday", value: "Monday" },
  { key: "tu", text: "Tuesday", value: "Tuesday" },
  { key: "we", text: "Wensday", value: "Wensday" },
  { key: "th", text: "Thursday", value: "Thursday" },
  { key: "fr", text: "Friday", value: "Friday" }
];

const optionsTopics = [
  { key: "de", text: "Depression", value: "Depression" },
  { key: "an", text: "Anxiety", value: "Anxiety" },
  { key: "st", text: "Stress", value: "Stress" },
  { key: "ar", text: "Anorexia", value: "Anorexia" }
];

const Find = ({ data, handleFindChange, find }) => {
  return (
    <div className="container">
      <Form>
        Therapist preferences
        <Form.Group widths="equal">
          <Form.Field>
            <label>Days</label>
            <Dropdown
              placeholder="Days"
              name="days"
              value={data.day}
              onChange={handleFindChange}
              fluid
              multiple
              selection
              options={optionsDays}
              value={data.days}
            />
          </Form.Field>
          <Form.Field>
            <label>Topics</label>
            <Dropdown
              placeholder="Topics"
              name="topics"
              value={data.topics}
              onChange={handleFindChange}
              fluid
              multiple
              selection
              options={optionsTopics}
              value={data.topics}
            />
          </Form.Field>
          <Form.Field
            control={Select}
            label="Gender"
            options={options}
            placeholder="Gender"
            name="gender"
            value={data.gender}
            onChange={handleFindChange}
          />
        </Form.Group>
        <Form.Field control={Button} color="blue" onClick={find}>
          Find Therapist
        </Form.Field>
      </Form>
    </div>
  );
};

export default Find;
