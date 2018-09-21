const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const moment = require("moment");

router.get("/find", (req, res) => {
  User.findOne({ _id: req.user._id })
    .then(result => {
      const user = {
        topics: result.diagnose
      };
      console.log(user);
      res.send(user);
    })
    .catch(error => {
      console.log(error);
      res.send({ result: false });
    });
});

router.post("/find", (req, res) => {
  const gender = req.body.data.gender;
  const days = req.body.data.days;
  const topics = req.body.data.topics;

  User.find({ available: true, role: "Therapist" })
    .populate({
      path: "appointments",
      match: { status: { $ne: "Canceled" } },
      select: "day starttime endtime"
    })
    .then(result => {
      const avaTherapist = result.filter(el => {
        if (Object.keys(el.slots).length === 0) return false;
        for (let appointment of el.appointments) {
          if (typeof el.slots[appointment.day] === "undefined") continue;
          for (let slot of el.slots[appointment.day]) {
            if (appointment.starttime >= slot.start && appointment.start <= slot.end) {
              const diffbefore = moment(appointment.start, "HH.mm")
                .substract(30, "minutes")
                .format("HH.mm");
              if (diffbefore >= slot.start) {
                const newSlotBefore = { start: slot.start, end: appointment.start };
                el.slots[appointment.day].push(newSlotBefore);
              }
              const diffafter = moment(appointment.end, "HH.mm")
                .add(30, "minutes")
                .format("HH.mm");
              if (diffbefore <= slot.start) {
                const newSlotAfter = {
                  start: moment(appointment.end, "HH.mm")
                    .add(5, "minutes")
                    .format("HH.mm"),
                  end: slot.end
                };
                el.slots[appointment.day].push(newSlotBefore);
              }
              el.slots[appointment.day].splice(el.slots[appointment.day].indexOf(slot));
            }
            if (el.slots[appointment.day].length === 0) {
              delete el.slots[appointment.day];
            }
          }
        }
        if (Object.keys(el.slots).length === 0) return false;
        return true;
      });
      const perfectMatches = [];
      const mixedMatches = [];
      const minMatches = [];
      for (const therapist of avaTherapist) {
        // check skills/topics
        let prefskills = true;
        for (const topic of topics) {
          if (therapist.skills.indexOf(topic) === -1) {
            prefskills = false;
            break;
          }
        }
        // check prefred days
        let prefday = false;
        for (const day of days) {
          if (therapist.slots[day].length !== 0) {
            prefday = true;
          }
        }
        // check gender
        let prefgender = false;
        if (gender === "" || therapist.gender === gender) prefgender = true;
        // Perfect match
        if (prefgender && prefskills && prefday) {
          perfectMatches.push(JSON.parse(JSON.stringify(therapist)));
          continue;
        }
      }
      //JSON.parse(JSON.stringify( originalObject ));

      console.log(result);
      console.log("therapist found");
      res.send({ result: true });
    })
    .catch(error => {
      console.log(error);
      res.send({ result: false });
    });
});

module.exports = router;
