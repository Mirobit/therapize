import React from "react";
import Slot from "./Slot";
import { Button, Icon } from "semantic-ui-react";

const Day = ({ day, timeslots, handleSlotChange, removeSlot, addSlot }) => {
  console.log("day", timeslots);
  const mappedDaySlots = timeslots.map((timeslot, index) => {
    return (
      <Slot
        day={day}
        timeslot={timeslot}
        index={index}
        key={day + index}
        handleSlotChange={handleSlotChange}
        removeSlot={removeSlot}
      />
    );
  });

  return (
    <div style={{ marginRight: "10px" }}>
      <span
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "10px",
          display: "inline-block"
        }}
      >
        {day}
        {"  "}
        <span onClick={() => addSlot(day)} style={{ color: "teal" }}>
          <Icon name="plus" size="small" />
        </span>
      </span>
      <div />
      {mappedDaySlots}
    </div>
  );
};

export default Day;
