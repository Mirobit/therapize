import React from "react";
import { Button } from "semantic-ui-react";
import moment from "moment";

const Slot = ({ day, start, pickTimeSlot }) => {
  return (
    <span>
      <button
        role="button"
        className="ui basic button"
        style={{ marginBottom: "4px" }}
        key={day + start}
        onClick={() =>
          pickTimeSlot(
            day,
            start,
            moment(start, "HH.mm")
              .add(25, "minutes")
              .format("HH.mm")
          )
        }
      >
        {start}
      </button>
    </span>
  );
};

export default Slot;
