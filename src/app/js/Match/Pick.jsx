import React from "react";
import moment from "moment";
import Slot from "./Slot";
import { Card, Image, Button } from "semantic-ui-react";

const Pick = ({
  topmatch,
  pickTimeSlot,
  cancelTimeSlot,
  confirmTimeSlot,
  pickedTime,
  pickedTimeSlot
}) => {
  console.log("topmatch", topmatch);
  const mappedTimeSlots = [];
  for (let day in topmatch.slots) {
    if (topmatch.slots[day].length === 0) {
      continue;
    }
    mappedTimeSlots.push(
      <div key={day}>
        <strong>{day}</strong>
        <br />
      </div>
    );
    const copyDaySlots = JSON.parse(JSON.stringify(topmatch.slots[day]));
    for (let slot of copyDaySlots) {
      while (slot.start < slot.end) {
        mappedTimeSlots.push(
          <Slot day={day} start={slot.start} key={day + slot.start} pickTimeSlot={pickTimeSlot} />
        );
        slot.start = moment(slot.start, "HH.mm")
          .add(30, "minutes")
          .format("HH.mm");
      }
    }
  }

  const confirmation = (
    <div>
      <div>
        Do you want to confirm a weekly appointment every {pickedTimeSlot.day} from{" "}
        {pickedTimeSlot.start} to {pickedTimeSlot.end}
      </div>
      <div className="ui two buttons">
        <Button onClick={confirmTimeSlot} basic color="green">
          Confirm
        </Button>
        <Button onClick={cancelTimeSlot} basic color="red">
          Cancel
        </Button>
      </div>
    </div>
  );
  return (
    <div>
      <Card>
        <Image src={topmatch.profilePicture} />
        <Card.Content>
          <Card.Header>{topmatch.name}</Card.Header>
          <Card.Meta>
            <span className="date">Experienced with {topmatch.skills.join(" ,")}</span>
          </Card.Meta>
          <Card.Description>{topmatch.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>{pickedTime ? confirmation : mappedTimeSlots}</Card.Content>
      </Card>
    </div>
  );
};

export default Pick;
