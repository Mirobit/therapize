const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const crypto = require("crypto");
const Appointment = require("../../models/Appointment");
const moment = require("moment");

router.get("/find", (req, res) => {
  User.findOne({ _id: req.user._id })
    .then(result => {
      const user = {
        topics: result.diagnose
      };
      res.send(user);
    })
    .catch(error => {
      console.log(error);
      res.send({ result: false });
    });
});

router.post("/confirm", (req, res) => {
  console.log(req.body.therapist);
  return new Appointment({
    therapist: req.body.therapist,
    day: req.body.slot.day,
    starttime: req.body.slot.start,
    endtime: req.body.slot.end,
    duration: 25,
    user: req.user._id,
    inhouse: true,
    roomid: crypto
      .createHash("sha256")
      .update(req.body.therapist + req.user._id + req.body.slot.day + req.body.slot.start)
      .digest("hex"),
    status: "Unconfirmed"
  })
    .save()
    .then(appointment => {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { appointments: appointment._id } },
        { new: true }
      ).exec();
      return appointment;
    })
    .then(appointment => {
      User.findOneAndUpdate(
        { _id: req.body.therapist },
        { $push: { appointments: appointment._id } },
        { new: true }
      ).exec();
    })
    .then(result => {
      res.send(true);
    })
    .catch(error => {
      console.log(error);
      res.send(false);
    });
});

router.post("/find", (req, res) => {
  const gender = req.body.data.gender;
  const days = req.body.data.days;
  const topics = req.body.data.topics;

  User.find({ available: true, role: "Therapist" })
    .select("name age gender profilePicture skills slots appointments description")
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
            if (appointment.starttime >= slot.start && appointment.starttime <= slot.end) {
              const diffbefore = moment(appointment.starttime, "HH.mm")
                .subtract(30, "minutes")
                .format("HH.mm");
              console.log("diffbefore:", diffbefore, ">=", slot.start);
              if (diffbefore >= slot.start) {
                console.log("diffbeforeIN", slot.start, diffbefore);
                const newSlotBefore = { start: slot.start, end: appointment.starttime };
                el.slots[appointment.day].push(newSlotBefore);
              }
              const diffafter = moment(appointment.endtime, "HH.mm")
                .add(35, "minutes")
                .format("HH.mm");
              console.log("diffafter:", diffafter, "<=", slot.end);
              if (diffafter <= slot.end) {
                console.log("diffafterIN", diffafter);
                const newSlotAfter = {
                  start: moment(appointment.endtime, "HH.mm")
                    .add(5, "minutes")
                    .format("HH.mm"),
                  end: slot.end
                };
                el.slots[appointment.day].push(newSlotAfter);
              }
              el.slots[appointment.day].splice(el.slots[appointment.day].indexOf(slot), 1);
            }
            if (el.slots[appointment.day].length === 0) {
              console.log("delte");
              delete el.slots[appointment.day];
            } else {
              el.slots[appointment.day].sort((a, b) => {
                return a >= b;
              });
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
        // at least one skill
        let prefoneskills = false;
        if (topics.length === 0) prefoneskills = true;
        for (const topic of topics) {
          if (therapist.skills.indexOf(topic) !== -1) {
            prefoneskills = true;
            break;
          }
        }
        // check prefred days
        let prefday = false;
        if (days.length === 0) prefday = true;
        for (const day of days) {
          if (therapist.slots[day].length !== 0) {
            prefday = true;
          }
        }
        // check gender
        let prefgender = false;
        if (gender === "" || therapist.gender === gender) prefgender = true;

        therapist.prefday = prefday;
        therapist.prefgender = prefgender;
        therapist.prefskills = prefskills;
        therapist.prefoneskills = prefoneskills;

        // Perfect match
        if (prefgender && prefskills && prefday) {
          perfectMatches.push(JSON.parse(JSON.stringify(therapist)));
          continue;
        }
        // Mixed match
        if (prefoneskills && (prefgender || prefday)) {
          mixedMatches.push(JSON.parse(JSON.stringify(therapist)));
          continue;
        }
        // Min match
        if (prefoneskills || prefgender || prefday) {
          minMatches.push(JSON.parse(JSON.stringify(therapist)));
          continue;
        }
      }

      if (perfectMatches.length !== 0) {
        res.send({ status: "perfect", therapists: perfectMatches });
      } else if (mixedMatches.length !== 0) {
        res.send({ status: "mixed", therapists: mixedMatches });
      } else if (minMatches.length !== 0) {
        res.send({ status: "min", therapists: minMatches });
      } else {
        res.send(false);
      }
    })
    .catch(error => {
      console.log(error);
      res.send({ result: false });
    });
});

module.exports = router;
