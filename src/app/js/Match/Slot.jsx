import React from "react";
import { Button } from "semantic-ui-react";
import moment from "moment";

const Slot = ({ day, start, pickTimeSlot }) => {
  return (
    <Button
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
      basic
    >
      {start}
    </Button>
  );
};

export default Slot;
