import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Select,
  Segment,
  TextArea,
  Icon,
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
    <div className="flex-container-find">
      <Segment style={{ width: "580px" }}>
        <form className="ui form">
          <span
            style={{
              color: "#666869",
              fontSize: "23px",
              display: "inline-block",
              marginBottom: "20px"
            }}
          >
            Preferences
          </span>
          <Form.Group>
            <Form.Field width={5}>
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
            <Form.Field width={5}>
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
              width={6}
              control={Select}
              label="Gender"
              options={options}
              placeholder="Gender"
              name="gender"
              value={data.gender}
              onChange={handleFindChange}
            />
          </Form.Group>
          <Form.Field control={Button} color="teal" onClick={find}>
            <Icon name="search" />
            Find Therapist
          </Form.Field>
        </form>
      </Segment>
    </div>
  );
};

export default Find;
