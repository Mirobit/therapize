import React from "react";
import { TimeInput } from "semantic-ui-calendar-react";
import { Button, Icon } from "semantic-ui-react";

const Slot = ({ day, timeslot, index, handleSlotChange, removeSlot }) => {
  return (
    <div>
      <TimeInput
        name={day}
        value={timeslot.start}
        placeholder="Start"
        key={day + index + "start"}
        iconPosition="left"
        closable={true}
        onChange={(event, { name, value }) => handleSlotChange(day, index, "start", value)}
      />
      <TimeInput
        name={day}
        value={timeslot.end}
        closable={true}
        placeholder="End"
        iconPosition="left"
        key={day + index + "end"}
        onChange={(event, { name, value }) => handleSlotChange(day, index, "end", value)}
      />
      <span onClick={() => removeSlot(day, index)} style={{ color: "red" }}>
        <Icon name="close" size="small" />
      </span>
    </div>
  );
};

export default Slot;
